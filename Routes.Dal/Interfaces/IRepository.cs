using Routes.Dal.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Routes.Dal.Interfaces
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        T GetById(int Id);
        IEnumerable<T> Find(Func<T, bool> predicate);
        void Create(T t);
        void Update(T t);
        void Delete(int Id);
        Task<T> GetAsync(int Id);
    }
        
}
