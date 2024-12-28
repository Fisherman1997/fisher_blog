
using Blog.Model.Entity;
using Blog.Model.Rsult;
using Blog.Service.Api.Interface;
using SqlSugar;

namespace Blog.Service.Api
{
    public class VisitService: IVisitService
    {
        public VisitService(ISqlSugarClient client)
        {
            Client = client;
        }

        public ISqlSugarClient Client { get; }

        public async Task<List<VisitRsult>> GetVisit()
        {
            // 获取最近一个星期的数据
            DateTime oneMonthAgo = DateTime.Now.AddDays(-7);

            var oneWeekAgoVisits = await Client.Queryable<DailyVisitEnity>()
                .Where(v => v.VisitDate >= oneMonthAgo) 
                .OrderBy(v => v.VisitDate, OrderByType.Desc) 
                .ToListAsync();

            var oneWeekAgo = oneWeekAgoVisits
                .Select(v => v.VisitDate.ToString("yyyy-MM-dd"))
                .ToArray().Distinct().ToList()
                .Select(it => new VisitRsult
                {
                    Date = it,
                    Count = oneWeekAgoVisits
                        .Where(cit => cit.VisitDate.ToString("yyyy-MM-dd") == it)
                        .Select(v => v.VisitCount)
                        .ToArray().Sum()
                }).ToList();

            return oneWeekAgo;
        }
    }
}
