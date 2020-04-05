using System;
using System.Collections.Generic;

namespace PickUpAndGo.Persistence.Entities
{
    public class Order : BaseEntity
    {
        public string UserId { get; set; }
        public string StoreId { get; set; }
        public string State { get; set; }
        public DateTime TimeCreated { get; set; }

        public User User { get; set; }
        public ICollection<StoreOrder> StoreOrders { get; set; }
        public ICollection<OrderProduct> OrderProducts { get; set; }
    }
}