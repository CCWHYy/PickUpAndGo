namespace PickUpAndGo.Models.User
{
    public class CreateUserModel
    {
        public string StoreId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}