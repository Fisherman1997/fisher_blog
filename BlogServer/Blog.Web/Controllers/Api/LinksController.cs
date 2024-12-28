using Blog.Model.Entity;
using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Api.Interface;
using Blog.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Web.Controllers.Api
{
    [Route("api/links")]
    [ApiController]
    [Authorize]
    public class LinksController : ControllerBase
    {
        public ILinksService LinksService { get; }

        public LinksController(ILinksService linksService)
        {
            LinksService = linksService;
        }
        [HttpPost("insert")]
        public async Task<ResultStruct> Insert([FromBody] LinksInsertParam param)
        {
            return await ResultFun.AsyncReturn(param, LinksService.Insert);
        }

        [HttpPost("list")]
        public async Task<ResultStruct<PageResult<LinksEnity>>> List([FromBody] PageParam param)
        {
            return await ResultFun.AsyncReturn(param, LinksService.List);
        }

        [HttpPost("update")]
        public async Task<ResultStruct> Update([FromBody] LinksUpdateParam param)
        {
            return await ResultFun.AsyncReturn(param, LinksService.Update);
        }

        [HttpDelete("delete")]
        public async Task<ResultStruct> Delete([FromBody] IDParam param)
        {
            return await ResultFun.AsyncReturn(param, LinksService.Delete);
        }
    }
}
