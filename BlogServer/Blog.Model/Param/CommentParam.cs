
namespace Blog.Model.Param
{
    public class CommentFindParam: PageParam
    {
        public string? ArticleName {  get; set; }

        public string? Content { get; set; }
    }

    public class CommentUpdateParam 
    {
        public int Id { get; set; }
        public required string Content { get; set; }
    }

    public class CommentInsertParam
    { 
        public required string ArticleId { get; set; }
        public required string ReviewerName { get;set; }
        public required string Qq { get; set; }
        public required string Content { get; set; }
        public required string ArticleUrl { get; set; }
        public string? ReplyQQ { get; set; }
        public int? ParentId { get; set; }
        public string? Httpsrc { get; set; }
        public string? ReplyName { get; set; }
    }
    public class CommentHomeFindParam : PageParam
    {
        public required string ArticleId { get; set; }
    }
}
