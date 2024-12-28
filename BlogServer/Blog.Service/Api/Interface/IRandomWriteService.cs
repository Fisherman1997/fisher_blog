using Blog.Model.Param;
using Blog.Model.Rsult;
using SqlSugar;
namespace Blog.Service.Api.Interface
{
    public interface IRandomWriteService
    {
        ISqlSugarClient Db { get; }
        IFileService FileService { get; }
        Task Insert(RandomWriteInsertParam param);
        Task Update(RandomWriteUpdateParam param);
        Task<PageResult<RandomWriteFindRsult>> List(RandomWriteFindParam param);
        Task<RandomWriteFindRsult> FindOne(IDParam param);
        Task Delete(IDParam param);
    }
}
