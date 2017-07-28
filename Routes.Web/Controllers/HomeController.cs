using Routes.Dal.Entities;
using Routes.Dal.Interfaces;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Routes.Web.Controllers
{
    public class HomeController : Controller
    {
        IRouteRepository repository;

        public HomeController(IRouteRepository repos)
        {
            repository = repos;
        }

        public ActionResult Index()
        {
            return View(repository.GetAll().ToList());
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}