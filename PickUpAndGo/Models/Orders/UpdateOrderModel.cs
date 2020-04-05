using PickUpAndGo.Models.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PickUpAndGo.Models.Orders
{
    public class UpdateOrderModel
    {
        public string Id { get; set; }
        public string State { get; set; }
    }
}