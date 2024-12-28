using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Home.Interface;
using Blog.Utils;
using Blog.Web.Attributes;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Web.Controllers.Home
{
    [Route("blog/custom")]
    [ApiController]
    [TrackVisit]  // 整个控制器都会被统计
    public class CustomController : ControllerBase
    {
        public CustomController(ICustomHome customHonme)
        {
            CustomHome = customHonme;
        }

        public ICustomHome CustomHome { get; }


        [HttpPost("find")]
        public async Task<ResultStruct<CustomFindHomeRsult>> Find([FromBody] NameParam param)
        {
            return await ResultFun.AsyncReturn(param, CustomHome.Find);
        }
    }
}
