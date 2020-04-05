using System.Collections.Generic;

namespace PickUpAndGo.Persistence.Entities
{
    public class Product : BaseEntity
    {
        public string StoreId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Quantity { get; set; }
        public string QuantityUnit { get; set; }
        public double Price { get; set; }
        public string Category { get; set; }

        public Store Store { get; set; }
        public ICollection<OrderProduct> OrderProducts { get; set; }
    }
}