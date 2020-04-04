using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PickUpAndGo.Persistence.Context;
using PickUpAndGo.Persistence.Entities;

namespace PickUpAndGo.Persistence.Repositories.Stores
{
    public class StoreRepository : Repository<Store>, IStoreRepository
    {
        private AppDbContext Context => BaseContext as AppDbContext;

        public StoreRepository(AppDbContext context) : base(context)
        {
        }
    }
}
