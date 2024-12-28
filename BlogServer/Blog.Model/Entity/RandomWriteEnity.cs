using SqlSugar;

namespace Blog.Model.Entity
{
    [SugarTable("random_write")]
    public class RandomWriteEnity: TimeEnity
    {
        [SugarColumn(ColumnDescription = "url数组，josn数据", IsNullable = true)]
        public string? Cover_list { get; set; }

        [SugarColumn(ColumnDescription = "内容", IsNullable = false, ColumnDataType = "text")]
        public string? Content { get; set; }

        [SugarColumn(ColumnDescription = "点击数", IsNullable = false)]
        public int? Clicks { get; set; } = 0;

        [SugarColumn(ColumnDescription = "创建人id", IsNullable = false)]
        public int CreateUserId { get; set; }
    }
}
