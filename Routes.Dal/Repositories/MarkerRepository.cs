using Routes.Dal.Entities;
using Routes.Dal.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Routes.Dal.Repositories
{
   public class MarkerRepository:IMarkerRepository
    {    
        RoutesContext context;
        /// <summary>
        /// Конструктор класса
        /// </summary>
        /// <param name="name"> имя строки подключения </param>
        public MarkerRepository(string name)
        {
            context = new RoutesContext();
        }

        public void Create(Marker t)
        {
            throw new NotImplementedException();
        }

        public void Delete(int Id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Marker> Find(Func<Marker, bool> predicate)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Marker> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Marker> GetAsync(int Id)
        {
            throw new NotImplementedException();
        }

        public Marker GetById(int Id)
        {
            throw new NotImplementedException();
        }

        public void Update(Marker t)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Marker> GetRouteMarkers(int Id)
        {
            IEnumerable<Marker> markers = context.RoutesMarkers.Where(item => item.RouteID == Id);
            return markers;
        }
    }
}
