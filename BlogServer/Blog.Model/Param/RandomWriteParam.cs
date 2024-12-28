using System.ComponentModel;

namespace Blog.Model.Param
{
    public class RandomWriteInsertParam
    {
        public string[]? Cover_list {  get; set; }
        public int CreateUserId { get; set; }
        public required string Content {  get; set; }
    }

    public class RandomWriteUpdateParam: RandomWriteInsertParam
    {
        public required int Id { get; set; }
        public new int? CreateUserId { get; set; } = null;
    }

    public class RandomWriteFindParam : PageParam
    {
        [DefaultValue(null)]
        public string? Content { get; set; } = null;
    }
}
