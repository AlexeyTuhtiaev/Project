using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Routes.Dal.Entities
{
  public  class Photo
    {
        public int PhotoID { get; set; }
        public byte[] Image { get; set; }
        public string MimeType { get; set; }

        public RoutesMarker RoutesMarker { get; set; }
    }
}
