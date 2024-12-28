using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Api.Interface;
using Blog.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Web.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ArticleController : ControllerBase
    {
        public IArticleService ArticleService { get; }

        public ArticleController(IArticleService articleService)
        {
            ArticleService = articleService;
        }

        [HttpPost("insert")]
        public async Task<ResultStruct> Insert([FromBody] ArticleInsertParam param)
        {
            return await ResultFun.AsyncReturn(param, ArticleService.Insert);
        }

        [HttpPost("list")]
        public async Task<ResultStruct<PageResult<ArticleFindRsult>>> List([FromBody] ArticleFindParam param)
        {
            return await ResultFun.AsyncReturn(param, ArticleService.List);
        }

        [HttpPost("update")]
        public async Task<ResultStruct> Update([FromBody] ArticleUpdateParam param)
        {
            return await ResultFun.AsyncReturn(param, ArticleService.Update);
        }

        [HttpPost("findOne")]
        public async Task<ResultStruct<ArticleFindRsult>> FindOne([FromBody] IDParam param)
        {
            return await ResultFun.AsyncReturn(param, ArticleService.FindOne);
        }

        [HttpDelete("delete")]
        public async Task<ResultStruct> Delete([FromBody] IDParam param)
        {
            return await ResultFun.AsyncReturn(param, ArticleService.Delete);
        }
    }
}
