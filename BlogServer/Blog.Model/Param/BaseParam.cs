
using System.ComponentModel;

namespace Blog.Model.Param
{
    public class IDParam
    {
        public int Id { get; set; }
    }
    public class NameParam
    {
        public required string Name { get; set; }
    }
    public class NameAndIDParam: IDParam
    {
        public int Name { get; set; }
    }

    public class PageParam
    {
        [DefaultValue(1)]
        public int Page { get; set; }
        [DefaultValue(10)]
        public int PageNum { get; set; }
    }
    public class PageAndIdParam: IDParam
    {
        public int Page { get; set; }
        public int PageNum { get; set; }
    }
}
