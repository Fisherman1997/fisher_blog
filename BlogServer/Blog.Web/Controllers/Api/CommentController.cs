using Blog.Model.Entity;
using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Api.Interface;
using Blog.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Web.Controllers.Api
{
    [Route("api/comment")]
    [ApiController]
    [Authorize]
    public class CommentController : ControllerBase
    {
        public ICommentService CommentService { get; }

        public CommentController(ICommentService commentService)
        {
            CommentService = commentService;
        }

        [HttpPost("list")]
        public async Task<ResultStruct<PageResult<CommentEnity>>> List([FromBody] CommentFindParam param)
        {
            return await ResultFun.AsyncReturn(param, CommentService.List);
        }

        [HttpPost("update")]
        public async Task<ResultStruct> Update([FromBody] CommentUpdateParam param)
        {
            return await ResultFun.AsyncReturn(param, CommentService.Update);
        }

        [HttpDelete("delete")]
        public async Task<ResultStruct> Delete([FromBody] IDParam param)
        {
            return await ResultFun.AsyncReturn(param, CommentService.Delete);
        }
    }
}
