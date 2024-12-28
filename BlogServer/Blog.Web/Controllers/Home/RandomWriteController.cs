using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Home.Interface;
using Blog.Utils;
using Blog.Web.Attributes;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Web.Controllers.Home
{
    [Route("blog/randomWrite")]
    [ApiController]
    [TrackVisit]  // 整个控制器都会被统计
    public class RandomWriteController : ControllerBase
    {
        public RandomWriteController(IRandomWriteHome randomWriteHome)
        {
            RandomWriteHome = randomWriteHome;
        }

        public IRandomWriteHome RandomWriteHome { get; }


        [HttpPost("list")]
        public async Task<ResultStruct<PageResult<RandomWriteFindHomeRsult>>> List([FromBody] PageParam param)
        {
            return await ResultFun.AsyncReturn(param, RandomWriteHome.List);
        }

        [HttpPost("findOne")]
        public async Task<ResultStruct<RandomWriteFindHomeRsult>> FindOne([FromBody] IDParam param)
        {
            return await ResultFun.AsyncReturn(param, RandomWriteHome.FindOne);
        }
    }
}
