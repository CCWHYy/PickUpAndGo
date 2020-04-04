namespace PickUpAndGo.Auth.Models
{
    public class UserJwtModel
    {
        public string Token { get; set; }
        public long Expires { get; set; }
    }
}