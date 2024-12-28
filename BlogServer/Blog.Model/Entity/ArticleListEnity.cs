using Blog.Model.Enum;
using SqlSugar;

namespace Blog.Model.Entity
{
    [SugarTable("article_list")]
    public class ArticleListEnity : TimeEnity
    {

        [SugarColumn(ColumnDescription = "头像", IsNullable = false)]
        public string? Cover { get; set; }

        [SugarColumn(ColumnDescription = "标题", IsNullable = false, Length = 30)]
        public string? Title { get; set; }

        [SugarColumn(ColumnDescription = "内容", IsNullable = true, ColumnDataType = "text")]
        public string? Content { get; set; }

        [SugarColumn(ColumnDescription = "分类Id", IsNullable = false)]
        public int ClassId { get; set; }

        [SugarColumn(ColumnDescription = "点击数", IsNullable = false)]
        public int? Clicks { get; set; } = 0;

        [SugarColumn(ColumnDescription = "创建人Id", IsNullable = false)]
        public int CreateUserId { get; set; }

    }
}
