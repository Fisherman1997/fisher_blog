using SqlSugar;

namespace Blog.Model.Entity
{
    [SugarTable("classification")]
    public class ClassificationEnity: IDEnity
    {
        [SugarColumn(ColumnDescription = "名称", IsNullable = false, Length = 30)]
        public string? Name { get; set; }
    }
}
