
namespace Blog.Model.Param
{
    public class RegisterLoginParam
    {
        public required string Name { get; set; }
        public required string Code { get; set; }
        public required string Password { get; set; }
    }

    public class SignInParam
    { 
        public required string Code { get; set; }
        public required string Password { get; set; }
        public required string Captcha { get; set; }
    }

    public class ChankTokenParam
    {
        public required string Token { get; set; }
    }
}
