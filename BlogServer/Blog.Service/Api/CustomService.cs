using Blog.Model.Entity;
using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Api.Interface;
using SqlSugar;
namespace Blog.Service.Api
{
    public class CustomService: ICustomService
    {
        public CustomService(ISqlSugarClient client)
        {
            Db = client;
        }

        public ISqlSugarClient Db { get; }

        public async Task Insert(CustomInsertParam param)
        {
            var rsult = await Db.Queryable<CustomEnity>().Where(it => it.Name == param.Name).FirstAsync();
            if (rsult != null) throw new Exception("已存在同名项");
            var element = new CustomEnity
            {
                Content = param.Content,
                Clicks = 0,
                CreateDate = DateTime.Now,
                Name = param.Name
            };
            await Db.Storageable(element).ExecuteCommandAsync();
        }


        public async Task Update(CustomUpdateParam param)
        {
            var rsult = await Db.Queryable<CustomEnity>()
                .Where(it => it.Name == param.Name && it.Id != param.Id)
                .FirstAsync();
            if (rsult != null) throw new Exception("已存在同名项");
            var custom = await Db.Queryable<CustomEnity>().Where(it => it.Id == param.Id).FirstAsync();
            custom.Content = param.Content;
            custom.Name = param.Name;
            await Db.Storageable(custom).ExecuteCommandAsync();
        }

        public async Task<PageResult<CustomFindRsult>> List(CustomFindParam param)
        {
            RefAsync<int> total = 0;
            var list = await Db.Queryable<CustomEnity>()
                .WhereIF(!string.IsNullOrEmpty(param.Name), it => it.Name!.Contains(param.Name!))
                .ToPageListAsync(param.Page, param.PageNum, total);
            return new PageResult<CustomFindRsult>
            {
                Total = total,
                List = list.Select(x => new CustomFindRsult(x, false)).ToList()
            };
        }

        public async Task<CustomFindRsult> FindOne(IDParam param)
        {
            var custom = await Db.Queryable<CustomEnity>().Where(it => it.Id == param.Id).FirstAsync();
            if (custom == null) throw new NullReferenceException("该项不存在");
            return new CustomFindRsult(custom);
        }

        public async Task Delete(IDParam param)
        {
            await Db.Deleteable<CustomEnity>().In(it => it.Id, param.Id).ExecuteCommandAsync();
        }
    }
}
