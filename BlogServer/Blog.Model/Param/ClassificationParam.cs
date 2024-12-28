
namespace Blog.Model.Param
{
    public class ClassInsertParam
    {
        public required string Name { get; set; }
    }
    public class ClassUpdateParam: IDParam
    {
        public required string Name { get; set; }
    }
    public class ClassFindParam 
    {
        public string? Name { get; set; }
    }
}
