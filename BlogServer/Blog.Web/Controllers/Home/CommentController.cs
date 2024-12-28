using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Home.Interface;
using Blog.Utils;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Web.Controllers.Home
{
    [Route("blog/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        public CommentController(ICommentHome commentHome)
        {
            CommentHome = commentHome;
        }

        public ICommentHome CommentHome { get; }

        [HttpPost("insert")]
        public async Task<ResultStruct> Insert(CommentInsertParam param)
        {
            return await ResultFun.AsyncReturn(param, CommentHome.Insert);
        }

        [HttpPost("list")]
        public async Task<ResultStruct<PageResult<CommentHomeRsult>>> List(CommentHomeFindParam param)
        { 
            return await ResultFun.AsyncReturn(param,CommentHome.List);
        }
    }
}
