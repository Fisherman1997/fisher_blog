using Blog.Model.Entity;
using Blog.Model.Param;
using Blog.Model.Rsult;
using SqlSugar;

namespace Blog.Service.Api.Interface
{
    public interface ICustomService
    {
        ISqlSugarClient Db { get; }
        Task Insert(CustomInsertParam param);
        Task Update(CustomUpdateParam param);
        Task<PageResult<CustomFindRsult>> List(CustomFindParam param);
        Task<CustomFindRsult> FindOne(IDParam param);
        Task Delete(IDParam param);
    }
}
