using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace PickUpAndGo.Persistence.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly DbContext BaseContext;

        public Repository(DbContext context)
        {
            BaseContext = context;
        }

        public void Add(TEntity entity)
        {
            BaseContext.Set<TEntity>().Add(entity);
        }

        public ICollection<TEntity> GetAll()
        {
            return BaseContext.Set<TEntity>().ToList();
        }

        public ICollection<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
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