

namespace Blog.Model.Param
{
    public class ArticleFindParam: PageParam
    {
        //[DefaultValue(null)]
        public int? ClassId { get; set; }
        //[DefaultValue(null)]
        public string? Title { get; set; }
    }


    public class ArticleInsertParam
    {
        public required string[] Cover { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public required int ClassId { get; set; }
        public required int CreateUserId { get; set; }
    }

    public class ArticleUpdateParam: IDParam
    {
        public required string[] Cover { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public required int ClassId { get; set; }
    }


    public class ArticleFindHomeParam : PageParam
    { 
        public int? ClassId { get; set; }
        public string? Search { get; set; }
    }


    public class ArticleAndRandomFindHomeParam : PageParam
    {
        public string? Search { get; set; }
    }

}
