using Routes.Dal.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Routes.Dal.Entities;

namespace Routes.Dal.Repositories
{
    public class GaleryRepository : IGaleryRepository
    {
        RoutesContext context;
        /// <summary>
        /// Конструктор класса
        /// </summary>
        /// <param name="name"> имя строки подключения </param>
        public GaleryRepository(string name)
        {
            context = new RoutesContext();
        }

        public int Create(Photo t)
        {
            throw new NotImplementedException();
        }

        public void Delete(int Id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Photo> Find(Func<Photo, bool> predicate)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Photo> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Photo> GetAsync(int Id)
        {
            throw new NotImplementedException();
        }

        public Photo GetById(int Id)
        {
            throw new NotImplementedException();
        }

        public void Update(Photo t)
        {
            throw new NotImplementedException();
        }
    }
}
