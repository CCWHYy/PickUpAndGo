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
        protected readonly DbContext ForGenericsOnlyContext;

        public Repository(DbContext context)
        {
            ForGenericsOnlyContext = context;
        }

        public void Add(TEntity entity)
        {
            ForGenericsOnlyContext.Set<TEntity>().Add(entity);
        }

        public ICollection<TEntity> GetAll()
        {
            return ForGenericsOnlyContext.Set<TEntity>().ToList();
        }

        public ICollection<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {
            return ForGenericsOnlyContext.Set<TEntity>().Where(predicate).ToList();
        }

        public TEntity Get(string id)
        {
            return ForGenericsOnlyContext.Set<TEntity>().Find(id);
        }

        public void Remove(TEntity entity)
        {
            ForGenericsOnlyContext.Set<TEntity>().Remove(entity);
        }
    }
}