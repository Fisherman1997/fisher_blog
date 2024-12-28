using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Api.Interface;
using Blog.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Web.Controllers.Api
{
    [Route("api/routingConfigure")]
    [ApiController]
    [Authorize]
    public class RoutingConfigureController : ControllerBase
    {
        public RoutingConfigureController(IRoutingConfigureService routingConfigureService)
        {
            RoutingConfigureService = routingConfigureService;
        }
        public IRoutingConfigureService RoutingConfigureService { get; }

        [HttpPost("insert")]
        public async Task<ResultStruct> Insert([FromBody] RoutingConfigureInsertParam param)
        {
            return await ResultFun.AsyncReturn(param, RoutingConfigureService.Insert);
        }

        [HttpPost("list")]
        public async Task<ResultStruct<List<RoutingConfigureFindRsult>>> List([FromBody] RoutingConfigureFindParam param)
        {
            return await ResultFun.AsyncReturn(param, RoutingConfigureService.List);
        }

        [HttpPost("update")]
        public async Task<ResultStruct> Update([FromBody] RoutingConfigureUpdateParam param)
        {
            return await ResultFun.AsyncReturn(param, RoutingConfigureService.Update);
        }

        [HttpPost("getPowerRuoter")]
        public async Task<ResultStruct<List<RoutingConfigureFindRsult>>> GetPowerRuoter([FromBody] IDParam param)
        {
            return await ResultFun.AsyncReturn(param, RoutingConfigureService.GetPowerRuoter);
        }

        [HttpDelete("delete")]
        public async Task<ResultStruct> Delete([FromBody] IDParam param)
        {
            return await ResultFun.AsyncReturn(param, RoutingConfigureService.Delete);
        }
    }
}
