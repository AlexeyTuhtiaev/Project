using Routes.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Routes.Web.Controllers
{
    public class MenuController : Controller
    {
        List<MenuItem> routeMenuItems;

        public MenuController()
        {
            routeMenuItems = new List<MenuItem>
            {
                new MenuItem{Name="Маршрут", Controller="Route",  Action="CreateRoute",Active=string.Empty},
                new MenuItem{Name="Места", Controller="Marker",Action="RouteMarkers", Active=string.Empty},
                new MenuItem{Name="Галерея", Controller="Galery",Action="RouteGalery", Active=string.Empty}
            };
        }

        public PartialViewResult RouteMenu(int routeId, string a = "Index", string c = "Home")
        {
            IEnumerable<MenuItem> itemCliced = routeMenuItems.Where<MenuItem>(m => m.Controller == c);
            ViewBag.RouteId = routeId;
            if (itemCliced.Any())
                routeMenuItems.First(m => m.Controller == c).Active = "active";
            return PartialView(routeMenuItems);
        }
    }
}