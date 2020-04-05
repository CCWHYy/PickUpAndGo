using PickUpAndGo.Persistence.Context;
using PickUpAndGo.Persistence.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PickUpAndGo.Persistence.Repositories.OrdersProducts
{

    public class OrderProductRepository : Repository<OrderProduct>, IOrderProductRepository
    {
        private AppDbContext Context => BaseContext as AppDbContext;

        public OrderProductRepository(AppDbContext context) : base(context)
        {
        }
    }
}
