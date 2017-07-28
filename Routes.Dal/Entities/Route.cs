using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Web.Script.Serialization;

namespace Routes.Dal.Entities
{
    public class Route
    {
        public int RouteID { get; set; }

        [Display(Name ="Способ ввода маршрута")]
        public string RouteEnterTupe { get; set; }//способ ввода маршрута (ручной\автоматический)

        [Required]
        public string TravelType { get; set; }

        [Required]
        public string OriginPoint { get; set; }

        [Required]
        public string DestinationPoint { get; set; }

        [Required]
        public string Description { get; set; }

        public int ViewCount { get; set; }

        public virtual List<WayPoint> WayPoints { get; set; }
        
        public  List<RoutesMarker> RoutesMarker { get; set; }// убрал virtual, тк json сериализация зацикливается..

        public ApplicationUser ApplicationUser { get; set; }
    }
}
