using Blog.Model.Entity;
using Blog.Model.Param;
using Blog.Model.Rsult;
using SqlSugar;

namespace Blog.Service.Api.Interface
{
    public interface IClassificationService
    {
        ISqlSugarClient Db { get; }
        Task Insert(ClassInsertParam param);
        Task Update(ClassUpdateParam param);
        Task<List<ClassificationEnity>> List(ClassFindParam param);
        Task<ClassificationEnity> FindOne(IDParam param);
        Task Delete(IDParam param);
    }
}
