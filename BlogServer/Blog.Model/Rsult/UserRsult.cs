using Blog.Model.Entity;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace Blog.Model.Rsult
{
    public class UserListRsult: UserEnity
    {

        public new string[]? Portrait { get; set; }

        public UserListRsult(UserEnity user)
        {
            foreach (var prop in typeof(UserEnity).GetProperties())
            {
                var value = prop.GetValue(user);
                prop.SetValue(this, value);
            }
            Power = null;
            Password = null;
            Portrait = !string.IsNullOrEmpty(user.Portrait) ? JsonConvert.DeserializeObject<string[]>(user.Portrait!) : Array.Empty<string>();
        }
    }

    public class UserTokenRsult: UserEnity
    {
        public new string[] Portrait { get; set; }
        public UserTokenRsult(UserEnity user) 
        {
            foreach (var p in typeof(UserEnity).GetProperties())
            {
                var value = p.GetValue(user);
                p.SetValue(this, value);
            }

            Portrait = !string.IsNullOrEmpty(user.Portrait) ? JsonConvert.DeserializeObject<string[]>(user.Portrait)! : Array.Empty<string>();
        }
    }
}
