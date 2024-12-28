using SqlSugar;

namespace Blog.Model.Entity
{
    [SugarTable("daily_visit")]
    public class DailyVisitEnity: IDEnity
    {

        [SugarColumn(Length = 500, ColumnDescription = "链接路径")]
        public string? Path { get; set; } 

        [SugarColumn(ColumnDescription = "访问日期（只保存日期部分）")]
        public DateTime VisitDate { get; set; }

        [SugarColumn(ColumnDescription = "访问次数")]
        public int VisitCount { get; set; } 
    }
}
