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
        TEntity Find(Expression<Func<TEntity, bool>> predicate);
        ICollection<TEntity> FindAll(Expression<Func<TEntity, bool>> predicate);
        void Remove(TEntity entity);
    }
}