namespace PickUpAndGo.Persistence.Entities
{
    public class EmployeeStore
    {
        public string EmployeeId { get; set; }
        public string StoreId { get; set; }
        public string Role { get; set; }

        public Employee Employee { get; set; }
        public Store Store { get; set; }
    }
}