using Routes.Dal.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Routes.Web.Models
{
    public class RouteCreateViewModel
    {
        public Route Route { get; set; }
        public List<WayPoint> WayPoints { get; set; }
        public List<RoutesMarker> RoutesMarkers { get; set; }
    }
}