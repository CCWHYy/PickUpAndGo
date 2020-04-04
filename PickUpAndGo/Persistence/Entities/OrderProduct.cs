namespace PickUpAndGo.Persistence.Entities
{
    public class OrderProduct
    {
        public string OrderId { get; set; }
        public string ProductId { get; set; }
        public double PriceEach { get; set; }
        public double Quantity { get; set; }
        public string QuantityUnit { get; set; }

        public Order Order { get; set; }
        public Product Product { get; set; } 
    }
}