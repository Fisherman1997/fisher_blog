using SqlSugar;

namespace Blog.Model.Entity
{
    [SugarTable("links")]
    public class LinksEnity: StatusEnity
    {

        [SugarColumn(ColumnDescription = "名称", IsNullable = false)]
        public string? Name { get; set; }

        [SugarColumn(ColumnDescription = "文章标题", IsNullable = false)]
        public string? Avatar { get; set; }

        [SugarColumn(ColumnDescription = "网址", IsNullable = false)]
        public string? Http_url { get; set; }

        [SugarColumn(ColumnDescription = "网址", IsNullable = true)]
        public string? Description { get; set; }
    }
}
