using Blog.Model.Entity;
using Blog.Model.Param;
using Blog.Model.Rsult;
using SqlSugar;

namespace Blog.Service.Home.Interface
{
    public interface ILinksHome
    {
        ISqlSugarClient Db { get; }
        Task<List<LinksEnity>> List();
    }
}
