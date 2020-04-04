using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace PickUpAndGo.Persistence.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly DbContext BaseContext;

        public Repository(DbContext context)
        {
            BaseContext = context;
        }

        public TEntity Add(TEntity entity)
        {
            return BaseContext.Set<TEntity>().Add(entity).Entity;
        }

        public TEntity Update(TEntity item)
        {
            var result = BaseContext.Set<TEntity>().Attach(item);
            BaseContext.Entry(item).State = EntityState.Modified;
            return result.Entity;
        }

        public IQueryable<TEntity> Query(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = BaseContext.Set<TEntity>();

            foreach (var include in includes)
                query = query.Include(include);

            if (filter != null)
                query = query.Where(filter);

            if (orderBy != null)
                query = orderBy(query);

            return query;
        }

        public ICollection<TEntity> GetAll()
        {
            return BaseContext.Set<TEntity>().ToList();
        }

        public TEntity Find(Expression<Func<TEntity, bool>> predicate)
        {
            return BaseContext.Set<TEntity>().Where(predicate).FirstOrDefault();
        }

        public ICollection<TEntity> FindAll(Expression<Func<TEntity, bool>> predicate)
        {
            return BaseContext.Set<TEntity>().Where(predicate).ToList();
        }

        public TEntity Get(string id)
        {
            return BaseContext.Set<TEntity>().Find(id);
        }

        public void Remove(TEntity entity)
        {
            BaseContext.Set<TEntity>().Remove(entity);
        }
    }
}