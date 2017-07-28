using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Routes.Dal.Entities
{
   public class WayPoint
    {
        public int WayPointID { get; set; }
        public string Point { get; set; }

        public int RouteId { get; set; }
        public Route Route { get; set; }
    }
}
