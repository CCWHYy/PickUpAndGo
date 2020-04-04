namespace PickUpAndGo.Auth.PasswordEncryption
{
    public sealed class HashingOptions
    {
        public int Iterations { get; set; } = 10000;
    }
}