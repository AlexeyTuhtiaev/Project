using Routes.Dal.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Routes.Dal.Interfaces
{
    public interface IMarkerRepository: IRepository<Marker>
    {
        IEnumerable<Marker> GetRouteMarkers(int Id);
    }
}
