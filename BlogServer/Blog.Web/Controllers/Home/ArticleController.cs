using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Home.Interface;
using Blog.Utils;
using Blog.Web.Attributes;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Web.Controllers.Home
{
    [Route("blog/article")]
    [ApiController]
    [TrackVisit]  // 整个控制器都会被统计
    public class ArticleController : ControllerBase
    {
        public ArticleController(IArticleHome articleHome)
        {
            ArticleHome = articleHome;
        }

        public IArticleHome ArticleHome { get; }

        [HttpPost("list")]
        public async Task<ResultStruct<PageResult<ArticleFindHomeRsult>>> List([FromBody] ArticleFindHomeParam param)
        {
            return await ResultFun.AsyncReturn(param, ArticleHome.List);
        }

        [HttpPost("findArticleAndRandomWrite")]
        public async Task<ResultStruct<PageResult<ArticleAndRandmFindHomeRsult>>> FindArticleAndRandomWrite([FromBody] ArticleAndRandomFindHomeParam param)
        {
            return await ResultFun.AsyncReturn(param, ArticleHome.FindArticleAndRandomWrite);
        }

        [HttpPost("findOne")]
        public async Task<ResultStruct<ArticleFindHomeRsult>> FindOne([FromBody] IDParam param)
        {
            return await ResultFun.AsyncReturn(param, ArticleHome.FindOne);
        }
    }
}
