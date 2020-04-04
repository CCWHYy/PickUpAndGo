namespace PickUpAndGo.Persistence.Entities
{
    public class StoreOrder
    {
        public string OrderId { get; set; }
        public string StoreId { get; set; }

        public Store Store { get; set; }
        public Order Order { get; set; }
    }
}