using Blog.Model.Entity;

namespace Blog.Model.Rsult
{
    //public class UserInfo 
    //{ 
        
    //}

    public class SignInRsult
    {
        public required string Token { get; set; }
        public required UserListRsult UserInfo { get; set; }

    }
}
