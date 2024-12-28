using SqlSugar;

namespace Blog.Model.Entity
{
    [SugarTable("custom")]
    public class CustomEnity: IDEnity
    {

        [SugarColumn(ColumnDescription = "名称", IsNullable = false)]
        public string? Name { get; set; }

        [SugarColumn(ColumnDescription = "内容", IsNullable = false, ColumnDataType = "text")]
        public string? Content { get; set; }

        [SugarColumn(ColumnDescription = "创建时间", IsNullable = false, InsertServerTime = true)]
        public DateTime CreateDate { get; set; }

        [SugarColumn(ColumnDescription = "点击数", IsNullable = false)]
        public int? Clicks { get; set; } = 0;

    }
}
