using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PickUpAndGo.Models.Product
{
    public class CreateOrderProductModel
    {
        public string Id { get; set; }
        public string StoreId { get; set; }
        public int Quantity { get; set; }
    }
}
