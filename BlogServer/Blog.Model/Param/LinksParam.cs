
using Blog.Model.Enum;

namespace Blog.Model.Param
{
    public class LinksInsertParam
    {
        public required string Name {  get; set; }
        public required string Avatar { get; set; }
        public required string Http_url { get; set; }
        public required StatusEnum Status { get; set; }
        public string? Description { get; set; }
    }

    public class LinksUpdateParam: LinksInsertParam
    { 
        public required int Id { get; set; }
    }
}
