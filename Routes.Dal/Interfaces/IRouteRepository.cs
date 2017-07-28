using Routes.Dal.Entities;
using Routes.Dal.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Routes.Dal.Interfaces
{
    public interface IRouteRepository : IRepository<Route>
    {
        IEnumerable<RoutesMarker> GetRouteMarkers(int Id);
        Task<Photo> GetPhotoAsync(int Id);
        int GetFirstPhotoId(int routeId, int markerNumber);
    }
}
