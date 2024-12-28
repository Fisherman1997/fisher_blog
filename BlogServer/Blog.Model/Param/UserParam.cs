
using Blog.Model.Enum;
using System.ComponentModel;

namespace Blog.Model.Param
{
    public class UserInsertParam
    {
        public required string Name { get; set; }
        public required string Code { get; set; }
        public required StatusEnum Status { get; set; }
        public required string Password { get; set; }
        public required string[] Portrait { get; set; }
    }

    public class UserUpdateParam: IDParam
    {
        public required string Name { get; set; }
        public required string Code { get; set; }
        public required string[] Portrait { get; set; }
        public required StatusEnum Status { get; set; }
    }
    public class UserUpdatePasswordParam : IDParam
    {
        public required string Before_password { get; set; }
        public required string Password { get; set; }
    }
    public class UserUpdatePowerParam : IDParam
    { 
        public required int[] Power { get; set; }
    }
    public class UserFindParam : PageParam
    {
        [DefaultValue(null)]
        public string? Name { get; set; }
    }
}
