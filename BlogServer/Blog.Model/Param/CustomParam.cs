
namespace Blog.Model.Param
{
    public class CustomInsertParam
    {
        public required string Name {  get; set; }
        public required string Content { get; set; }
    }
    public class CustomUpdateParam: IDParam
    {
        public required string Name { get; set; }
        public required string Content { get; set; }
    }

    public class CustomFindParam : PageParam
    {
        public string? Name { get; set; }
    }
}
