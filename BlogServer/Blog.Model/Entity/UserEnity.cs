using SqlSugar;

namespace Blog.Model.Entity
{
    [SugarTable("user")]
    public class UserEnity : StatusEnity
    {

        [SugarColumn(ColumnDescription = "名称", IsNullable = false, Length = 30)]
        public string? Name { get; set; }

        [SugarColumn(ColumnDescription = "头像", IsNullable = false)]
        public string? Portrait { get; set; }

        [SugarColumn(ColumnDescription = "用户账号", IsNullable = false, Length = 8)]
        public string? Code { get; set; }

        [SugarColumn(ColumnDescription = "用户密码", IsNullable = false)]
        public string? Password { get; set; }

        [SugarColumn(ColumnDescription = "用户权限", IsNullable = true, Length = 1000)]
        public string? Power { get; set; }

        [SugarColumn(ColumnDescription = "邮箱", IsNullable = true)]
        public string? EMail { get; set; }

        [SugarColumn(ColumnDescription = "token", IsNullable = true, Length =400)]
        public string? Token { get; set; }

    }
}
