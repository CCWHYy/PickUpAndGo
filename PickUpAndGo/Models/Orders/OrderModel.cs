using PickUpAndGo.Models.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PickUpAndGo.Models.Orders
{
    public class OrderModel
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string StoreId { get; set; }
        public string State { get; set; }

        public ICollection<ProductModel> Products { get; set; }

    }
}
