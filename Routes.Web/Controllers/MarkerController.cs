using Routes.Dal.Entities;
using Routes.Dal.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Routes.Web.Controllers
{
    public class MarkerController : Controller
    {        
        IMarkerRepository markerRepository;

        public MarkerController( IMarkerRepository repoM)
        {
            markerRepository = repoM;
        }


        // GET: Marker
        public ActionResult RouteMarkers(int routeId)
        {
            ViewBag.routeId = routeId;
            return View();
        }


        public JsonResult GetMarkers(int Id)
        {
            List<Marker> markers = markerRepository.GetRouteMarkers(Id).ToList();
            return Json(markers, JsonRequestBehavior.AllowGet);
        }
    }
}