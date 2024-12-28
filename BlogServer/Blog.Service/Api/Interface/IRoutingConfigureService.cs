
using Blog.Model.Param;
using Blog.Model.Rsult;
using SqlSugar;

namespace Blog.Service.Api.Interface
{
    public interface IRoutingConfigureService
    {
        ISqlSugarClient Db { get; }
        Task Insert(RoutingConfigureInsertParam param);
        Task Update(RoutingConfigureUpdateParam param);
        Task<List<RoutingConfigureFindRsult>> List(RoutingConfigureFindParam param);
        Task Delete(IDParam param);
        Task<List<RoutingConfigureFindRsult>> GetPowerRuoter(IDParam param);
    }
}
