using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Api.Interface;
using Blog.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Web.Controllers.Api
{
    [Route("api/custom")]
    [ApiController]
    [Authorize]
    public class CustomController : ControllerBase
    {
        public CustomController(ICustomService customService)
        {
            CustomService = customService;
        }

        public ICustomService CustomService { get; }


        [HttpPost("insert")]
        public async Task<ResultStruct> Insert([FromBody] CustomInsertParam param)
        {
            return await ResultFun.AsyncReturn(param, CustomService.Insert);
        }

        [HttpPost("list")]
        public async Task<ResultStruct<PageResult<CustomFindRsult>>> List([FromBody] CustomFindParam param)
        {
            return await ResultFun.AsyncReturn(param, CustomService.List);
        }

        [HttpPost("update")]
        public async Task<ResultStruct> Update([FromBody] CustomUpdateParam param)
        {
            return await ResultFun.AsyncReturn(param, CustomService.Update);
        }

        [HttpPost("findOne")]
        public async Task<ResultStruct<CustomFindRsult>> FindOne([FromBody] IDParam param)
        {
            return await ResultFun.AsyncReturn(param, CustomService.FindOne);
        }

        [HttpDelete("delete")]
        public async Task<ResultStruct> Delete([FromBody] IDParam param)
        {
            return await ResultFun.AsyncReturn(param, CustomService.Delete);
        }
    }
}
