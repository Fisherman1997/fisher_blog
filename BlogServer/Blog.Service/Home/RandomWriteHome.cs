
using Blog.Model.Entity;
using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Home.Interface;
using SqlSugar;

namespace Blog.Service.Home
{
    public class RandomWriteHome: IRandomWriteHome
    {
        public RandomWriteHome(ISqlSugarClient client)
        {
            Db = client;
        }

        public ISqlSugarClient Db { get; }

        public async Task<PageResult<RandomWriteFindHomeRsult>> List(PageParam param)
        {
            RefAsync<int> total = 0;
            var liet = await Db.Queryable<RandomWriteEnity>()
                .LeftJoin<UserEnity>((r, u) => r.CreateUserId == u.Id)
                .OrderBy((r, u) => r.CreateDate, OrderByType.Desc)
                .Select((r, u) => new { r, u })
                .ToPageListAsync(param.Page,param.PageNum, total);
            return new PageResult<RandomWriteFindHomeRsult>
            {
                List = liet.Select(x => new RandomWriteFindHomeRsult(x.r, x.u)).ToList(),
                Total = total
            };
        }

        public async Task<RandomWriteFindHomeRsult> FindOne(IDParam param)
        {
            var result = await Db.Queryable<RandomWriteEnity>()
                .LeftJoin<UserEnity>((r, u) => r.CreateUserId == u.Id)
                .Where((r, u) => r.Id == param.Id)
                .Select((r, u) => new { r, u })
                .FirstAsync();
            if (result == null) throw new NullReferenceException("该项不存在");
            result.r.Clicks = result.r.Clicks + 1;
            await Db.Storageable(result.r).ExecuteCommandAsync();
            return new RandomWriteFindHomeRsult(result.r, result.u);
        }
    }
}
