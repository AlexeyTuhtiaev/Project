using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Routes.Dal.Entities
{
   public class RoutesMarker
    {
        public int RoutesMarkerID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string GeoLat { get; set; }
        public string GeoLong { get; set; }
        public string Icon { get; set; }

        public  List<Photo> Photos { get; set; }

        public int RouteID { get; set; }
        public Route Route { get; set; }
    }
}
