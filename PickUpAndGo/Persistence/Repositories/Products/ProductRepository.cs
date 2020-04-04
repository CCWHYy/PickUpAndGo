using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PickUpAndGo.Persistence.Context;
using PickUpAndGo.Persistence.Entities;

namespace PickUpAndGo.Persistence.Repositories.Products
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private AppDbContext Context => BaseContext as AppDbContext;

        public ProductRepository(AppDbContext context) : base(context)
        {
        }
    }
}
