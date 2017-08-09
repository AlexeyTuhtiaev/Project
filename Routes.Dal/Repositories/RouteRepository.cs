using Routes.Dal.Entities;
using Routes.Dal.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Routes.Dal.Repositories
{
    public class RouteRepository : IRouteRepository
    {

        RoutesContext context;
        /// <summary>
        /// Конструктор класса
        /// </summary>
        /// <param name="name"> имя строки подключения </param>
        public RouteRepository(string name)
        {
            context = new RoutesContext();
        }

        public int Create(Route r)
        {
            context.Routes.Add(r);
            context.SaveChanges();

            return r.RouteId;
        }

        public void Delete(int Id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Route> Find(Func<Route, bool> predicate)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Route> GetAll()
        {
            return context.Routes;
        }

        public Task<Route> GetAsync(int Id)
        {
            throw new NotImplementedException();
        }

        public Route GetById(int Id)
        {
            var r = context.Routes.Include("WayPoints").Where(item => item.RouteId == Id);
            return r.FirstOrDefault();
        }


        public Task<Photo> GetPhotoAsync(int photoId)
        {
            return context.Photos.FindAsync(photoId);
        }


        public int GetFirstPhotoId(int routeId, int markerNumber)
        {

            return context.Photos.Where(item => item.RoutesMarker.RouteID == routeId)
                                 .Where(item => item.RoutesMarker.MarkerID == markerNumber)
                                 .FirstOrDefault()
                                 .PhotoID;
        }



        public void Update(Route route)
        {
            List<WayPoint> storedWayPoints = context.WayPoints.Where(item => item.RouteId == route.RouteId).ToList();
            if (route.WayPoints != null && route.WayPoints.Any())
                foreach (WayPoint w in route.WayPoints)
                {
                    if (!storedWayPoints.Any(item => item.Point == w.Point))
                    {
                        w.Route = route;
                        w.RouteId = route.RouteId;
                        w.Numbering = route.WayPoints.Where(item => item.Point == w.Point).FirstOrDefault().Numbering;
                        context.WayPoints.Add(w);
                    }
                }
            Route storedRoute = context.Routes.Where(item=>item.RouteId==route.RouteId).FirstOrDefault();
            storedRoute.TravelType = route.TravelType;
            context.SaveChanges();

        }

        public IEnumerable<WayPoint> GetWayPoints(int routeId)
        {
            return context.WayPoints.Where(item => item.RouteId == routeId)
                                    .OrderBy(item=>item.Numbering);
        }

        public void DeleteWayPoint(WayPoint wp)
        {
            context.WayPoints.Remove(wp);
            context.SaveChanges();
        }
    }
}
