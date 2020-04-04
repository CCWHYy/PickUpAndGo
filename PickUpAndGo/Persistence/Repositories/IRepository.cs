using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace PickUpAndGo.Persistence.Repositories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        TEntity Add(TEntity entity);
        TEntity Get(string id);
        ICollection<TEntity> GetAll();
        void Remove(TEntity entity);
    }
}
