
using Blog.Model.Entity;
using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Home.Interface;
using SqlSugar;

namespace Blog.Service.Home
{
    public class CustomHome : ICustomHome
    {
        public CustomHome(ISqlSugarClient client)
        {
            Db = client;
        }

        public ISqlSugarClient Db { get; }

        public async Task<CustomFindHomeRsult> Find(NameParam param)
        {
            var custom = await Db.Queryable<CustomEnity>().Where(it => it.Name == param.Name).FirstAsync();
            if (custom == null) throw new NullReferenceException("该项不存在");
            custom.Clicks = custom.Clicks + 1;
            await Db.Storageable(custom).ExecuteCommandAsync();
            return new CustomFindHomeRsult(custom);
        }
    }
}   