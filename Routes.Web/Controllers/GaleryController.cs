using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Routes.Dal.Interfaces;

namespace Routes.Web.Controllers
{
    public class GaleryController : Controller
    {
        IGaleryRepository galeryRepository;

        public GaleryController(IGaleryRepository repoG)
        {
            galeryRepository = repoG;
        }
        // GET: Galery
        public ActionResult RouteGalery()
        {
            return View();
        }
    }
}