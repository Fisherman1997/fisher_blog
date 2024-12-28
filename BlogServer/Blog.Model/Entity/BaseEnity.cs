using Blog.Model.Enum;
using SqlSugar;

namespace Blog.Model.Entity
{
    public class IDEnity
    {
        [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]//数据库是自增才配自增 
        public int Id { get; set; }
    }
    public class StatusEnity: IDEnity
    {
        [SugarColumn(IsNullable = false, ColumnDescription = "状态：1-启用，2-关闭")]
        public StatusEnum Status { get; set; } = StatusEnum.On;
    }

    public class TimeEnity : IDEnity
    {

        [SugarColumn(ColumnDescription = "创建时间", IsNullable = false, InsertServerTime = true)]
        public DateTime? CreateDate { get; set; }

        [SugarColumn(ColumnDescription = "修改时间", IsNullable = true, UpdateServerTime = true)]
        public DateTime? UpdateTime { get; set; }
    }
}
