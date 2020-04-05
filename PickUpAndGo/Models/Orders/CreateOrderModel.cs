using PickUpAndGo.Models.Product;
using PickUpAndGo.Persistence.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PickUpAndGo.Models.Orders
{
    public class CreateOrderModel
    {
        public string StoreId { get; set; }
        public ICollection<CreateOrderProductModel> Products { get; set; }
    }
}
