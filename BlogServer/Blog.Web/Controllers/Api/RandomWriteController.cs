using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Api.Interface;
using Blog.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Web.Controllers.Api
{
    [Route("api/randomWrite")]
    [ApiController]
    [Authorize]
    public class RandomWriteController : ControllerBase
    {
        public RandomWriteController(IRandomWriteService randomWriteService)
        {
            RandomWriteService = randomWriteService;
        }

        public IRandomWriteService RandomWriteService { get; }

        [HttpPost("insert")]
        public async Task<ResultStruct> Insert([FromBody] RandomWriteInsertParam param)
        {
            return await ResultFun.AsyncReturn(param, RandomWriteService.Insert);
        }

        [HttpPost("list")]
        public async Task<ResultStruct<PageResult<RandomWriteFindRsult>>> List([FromBody] RandomWriteFindParam param)
        {
            return await ResultFun.AsyncReturn(param, RandomWriteService.List);
        }

        [HttpPost("update")]
        public async Task<ResultStruct> Update([FromBody] RandomWriteUpdateParam param)
        {
            return await ResultFun.AsyncReturn(param, RandomWriteService.Update);
        }

        [HttpPost("findOne")]
        public async Task<ResultStruct<RandomWriteFindRsult>> FindOne([FromBody] IDParam param)
        {
            return await ResultFun.AsyncReturn(param, RandomWriteService.FindOne);
        }

        [HttpDelete("delete")]
        public async Task<ResultStruct> Delete([FromBody] IDParam param)
        {
            return await ResultFun.AsyncReturn(param, RandomWriteService.Delete);
        }
    }
}
