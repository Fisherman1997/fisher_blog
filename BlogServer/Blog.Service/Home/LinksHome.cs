using Blog.Model.Entity;
using Blog.Service.Home.Interface;
using SqlSugar;

namespace Blog.Service.Home
{
    public class LinksHome: ILinksHome
    {
        public LinksHome(ISqlSugarClient client)
        {
            Db = client;
        }

        public ISqlSugarClient Db { get; }

        public async Task<List<LinksEnity>> List()
        {
            return await Db.Queryable<LinksEnity>().ToListAsync();
        }
    }
}
