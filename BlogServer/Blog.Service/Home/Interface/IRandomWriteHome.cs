
using Blog.Model.Param;
using Blog.Model.Rsult;
using SqlSugar;

namespace Blog.Service.Home.Interface
{
    public interface IRandomWriteHome
    {
        ISqlSugarClient Db { get; }
        Task<PageResult<RandomWriteFindHomeRsult>> List(PageParam param);
        Task<RandomWriteFindHomeRsult> FindOne(IDParam param);
    }
}
