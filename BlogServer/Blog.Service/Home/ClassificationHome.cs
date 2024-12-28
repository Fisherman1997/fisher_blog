using Blog.Model.Entity;
using Blog.Service.Home.Interface;
using SqlSugar;

namespace Blog.Service.Home
{
    public class ClassificationHome: IClassificationHome
    {
        public ClassificationHome(ISqlSugarClient client)
        {
            Db = client;
        }

        public ISqlSugarClient Db { get; }

        public async Task<List<ClassificationEnity>> List()
        { 
            return await Db.Queryable<ClassificationEnity>().ToListAsync();
        }
    }
}
