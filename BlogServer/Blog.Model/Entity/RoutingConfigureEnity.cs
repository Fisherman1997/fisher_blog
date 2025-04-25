using Blog.Model.Enum;
using SqlSugar;
namespace Blog.Model.Entity
{
    [SugarTable("routing_configure")]
    public class RoutingConfigureEnity: StatusEnity
    {
        [SugarColumn(ColumnDescription = "父级ID", IsNullable = true)]
        public int? Primary_id { get; set; }

        [SugarColumn(ColumnDescription = "标题", IsNullable = false)]
        public string? Title { get; set; }

        [SugarColumn(ColumnDescription = "名称（不要中文）", IsNullable = false)]
        public string? Name { get; set; }

        [SugarColumn(ColumnDescription = "路由路径", IsNullable = false)]
        public string? Path { get; set; }

        [SugarColumn(ColumnDescription = "路由组件路径", IsNullable = false)]
        public string? Component { get; set; }

        [SugarColumn(ColumnDescription = "范围： 0-后台， 1-前台", IsNullable = false)]
        public RangeEnum Range { get; set; }

        [SugarColumn(ColumnDescription = "是否菜单： 0-否， 1-是", IsNullable = false)]
        public MenuEnum Menu { get; set; }

        [SugarColumn(ColumnDescription = "图标", IsNullable = false)]
        public string? IconType { get; set; }

        [SugarColumn(ColumnDescription = "序号", IsNullable = false)]
        public int SerialNumber { get; set; }

        [SugarColumn(ColumnDescription = "重定向路径", IsNullable = true)]
        public string? Redirect { get; set; }

        [SugarColumn(ColumnDescription = "是否目录：1-是，0-否", IsNullable = false)]
        public ContentsEnum Contents { get; set; }
    }
}
