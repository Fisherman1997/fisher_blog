using Blog.Model.Entity;
using Microsoft.AspNetCore.Http;
using SqlSugar;

namespace Blog.Service.Api
{
    public class VisitStatService
    {
        private readonly ISqlSugarClient _db;

        public VisitStatService(ISqlSugarClient db)
        {
            _db = db;
        }

        public async Task LogVisitAsync(HttpContext context)
        {
            var path = context.Request.Path.ToString();
            var today = DateTime.Now.Date;

            // 检查并更新数据库中的访问统计记录
            var visitStat = await _db.Queryable<DailyVisitEnity>()
                                     .Where(v => v.Path == path && v.VisitDate == today)
                                     .FirstAsync();

            if (visitStat == null)
            {
                // 新记录
                var newVisit = new DailyVisitEnity
                {
                    Path = path,
                    VisitDate = today,
                    VisitCount = 1
                };
                await _db.Insertable(newVisit).ExecuteCommandAsync();
            }
            else
            {
                // 更新访问次数
                visitStat.VisitCount++;
                await _db.Updateable(visitStat).ExecuteCommandAsync();
            }
        }
    }

}
