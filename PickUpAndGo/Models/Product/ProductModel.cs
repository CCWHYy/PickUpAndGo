using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PickUpAndGo.Models.Product
{
    public class ProductModel
    {
        public string Id { get; set; }
        public string StoreId { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public double Quantity { get; set; }
        public string QuantityUnit { get; set; }
        public double Price { get; set; }
        public string Category { get; set; }
    }
}
