using Routes.Dal.Entities;
using Routes.Dal.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;


namespace Routes.Web.Controllers
{
    public class RouteController : Controller
    {
        IRouteRepository routeRepository;
        IMarkerRepository markerRepository;

        public RouteController(IRouteRepository repoR, IMarkerRepository repoM)
        {
            routeRepository = repoR;
            markerRepository = repoM;
        }

        // GET: Route
        public ActionResult ShowRoute(int Id)
        {
            return View(routeRepository.GetById(Id));
        }


        //Edit
        [HttpGet]
        public ActionResult EditRoute(int? routeId)
        {
            if (routeId == null)
            {
                return HttpNotFound();
            }

            Route route = routeRepository.GetById((int)routeId);

            if (route != null)
            {
                return View(route);
            }
            return HttpNotFound();
        }

        //Edit HttpPost
        [HttpPost]
        public ActionResult EditRoute(Route route)
        {
            if (route != null)
            {
                List<WayPoint> routeWayPoint = routeRepository.GetWayPoints(route.RouteId).ToList();

                if (route.WayPoints != null && route.WayPoints.Any())
                {
                    foreach (WayPoint w in routeWayPoint)
                    {
                        if (route.WayPoints.Any(item => item.Point == w.Point))
                            continue;
                        else
                        {
                            routeRepository.DeleteWayPoint(w);
                        }
                    }
                    route.WayPoints.Union(routeRepository.GetWayPoints(route.RouteId).ToList());
                }
                else
                    foreach (WayPoint w in routeWayPoint)
                        routeRepository.DeleteWayPoint(w);

                routeRepository.Update(route);
                return RedirectToAction("EditRoute", "Route", new { routeId = route.RouteId });
            }
            return HttpNotFound();
        }

        //Create route simple
        [HttpGet]
        public ActionResult CreateRoute()
        {
            return View();
        }
        [HttpPost]
        public ActionResult CreateRoute(Route route)
        {
            route.RouteEnterTupe = "Simple";
            int createdRouteId = routeRepository.Create(route);

            return RedirectToAction("EditRoute", "Route", new { routeId = createdRouteId });
        }

        //Create route manually
        [HttpGet]
        public ActionResult CreateRouteManually()
        {
            return View();
        }
        [HttpPost]
        public ActionResult CreateRouteManually(Route route)
        {
            routeRepository.Create(route);

            return RedirectToAction("Index");
        }


        public JsonResult GetWayPoints(int routeId)
        {
            List<WayPoint> wayPoint = routeRepository.GetWayPoints(routeId).ToList();
            return Json(wayPoint, JsonRequestBehavior.AllowGet);
        }

        public async Task<FileContentResult> GetImage(int routeId, int markerNumber)
        {
            int photoId = routeRepository.GetFirstPhotoId(routeId, markerNumber);

            Photo ph = await routeRepository.GetPhotoAsync(photoId);

            if (ph != null && ph.Image != null)
                return File(ph.Image, ph.MimeType);
            return null;
        }
    }
}