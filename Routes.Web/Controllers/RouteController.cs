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

        public JsonResult GetMarkers(int Id)
        {
            List<Marker> markers = markerRepository.GetRouteMarkers(Id).ToList();
            return Json(markers,JsonRequestBehavior.AllowGet);
        }

        //Edit
        [HttpGet]
        public ActionResult EditRoute(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            Route route = routeRepository.GetById((int)id);

            if (route != null)
            {
                return View(route);
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
            routeRepository.Create(route);

            return RedirectToAction("Index","Home");
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

        public async Task<FileContentResult> GetImage(int routeId,int markerNumber)
        {
            int photoId = routeRepository.GetFirstPhotoId(routeId, markerNumber);

            Photo ph = await routeRepository.GetPhotoAsync(photoId);

            if (ph != null && ph.Image != null)
                return File(ph.Image, ph.MimeType);
            return null;
        }
    }
}