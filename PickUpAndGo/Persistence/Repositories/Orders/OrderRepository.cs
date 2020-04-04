using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PickUpAndGo.Models.Orders;
using PickUpAndGo.Persistence.Context;
using PickUpAndGo.Persistence.Entities;

namespace PickUpAndGo.Persistence.Repositories.Orders
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        private AppDbContext Context => BaseContext as AppDbContext;

        public OrderRepository(AppDbContext context) : base(context)
        {

        }
    }
}
