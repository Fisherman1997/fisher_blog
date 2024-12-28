using SqlSugar;

namespace Blog.Model.Entity
{
    [SugarTable("comment")]
    public class CommentEnity: IDEnity
    {
        [SugarColumn(ColumnDescription = "文章ID", IsNullable = false)]
        public string? ArticleId { get; set; }

        [SugarColumn(ColumnDescription = "父级ID", IsNullable = true)]
        public int? ParentId { get; set; }

        [SugarColumn(ColumnDescription = "回复名称", IsNullable = true)]
        public string? ReplyName { get; set; }

        [SugarColumn(ColumnDescription = "内容", IsNullable = false, Length =500)]
        public string? Content { get; set; }

        [SugarColumn(ColumnDescription = "创建时间", IsNullable = false, InsertServerTime = true)]
        public DateTime CreateDate { get; set; }

        [SugarColumn(ColumnDescription = "评论人", IsNullable = false)]
        public string? ReviewerName { get; set; }

        [SugarColumn(ColumnDescription = "账号", IsNullable = false)]
        public string? Qq { get; set; }

        [SugarColumn(ColumnDescription = "网址", IsNullable = true)]
        public string? Httpsrc { get; set; }
    }
}
