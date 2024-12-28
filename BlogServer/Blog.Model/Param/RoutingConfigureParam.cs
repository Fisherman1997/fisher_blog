
using Blog.Model.Enum;

namespace Blog.Model.Param
{
    public class RoutingConfigureInsertParam
    {
        public required string Title { get; set; }
        public required string Path { get; set; }
        public required string Component { get; set; }
        public required RangeEnum Range { get; set; }
        public required MenuEnum Menu { get; set; }
        public required string Redirect { get; set; }
        public required StatusEnum Status { get; set; }
        public int? SerialNumber { get; set; }
    }

    public class RoutingConfigureUpdateParam : RoutingConfigureInsertParam
    { 
        public int Id { get; set; }
    }

    public class RoutingConfigureFindParam
    {
        public required RangeEnum Range { get; set; }
    }
}
