using Blog.Model.Entity;
using SqlSugar;

namespace Blog.Service.Home.Interface
{
    public interface IClassificationHome
    {
        ISqlSugarClient Db { get; }
        Task<List<ClassificationEnity>> List();
    }
}
