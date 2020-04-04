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
        TEntity Update(TEntity item);
        IQueryable<TEntity> Query(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null, params Expression<Func<TEntity, object>>[] includes);
        TEntity Get(string id);
        ICollection<TEntity> GetAll();
        TEntity Find(Expression<Func<TEntity, bool>> predicate);
        ICollection<TEntity> FindAll(Expression<Func<TEntity, bool>> predicate);
        void Remove(TEntity entity);
    }
}