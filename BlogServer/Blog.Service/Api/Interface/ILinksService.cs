
using Blog.Model.Entity;
using Blog.Model.Param;
using Blog.Model.Rsult;
using SqlSugar;

namespace Blog.Service.Api.Interface
{
    public interface ILinksService
    {
        ISqlSugarClient Db { get; }
        Task Insert(LinksInsertParam param);
        Task Update(LinksUpdateParam param);
        Task<PageResult<LinksEnity>> List(PageParam param);
        Task Delete(IDParam param);
    }
}
