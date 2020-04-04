using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace PickUpAndGo.Persistence.Repositories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        TEntity Get(string id);
        ICollection<TEntity> Find(Expression<Func<TEntity, bool>> predicate);
        ICollection<TEntity> GetAll();
        TEntity Add(TEntity entity);
        void Remove(TEntity entity);
    }
}