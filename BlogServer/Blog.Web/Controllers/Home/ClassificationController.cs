using Blog.Model.Entity;
using Blog.Service.Home.Interface;
using Blog.Utils;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Web.Controllers.Home
{
    [Route("blog/class")]
    [ApiController]
    public class ClassificationController : ControllerBase
    {
        public ClassificationController(IClassificationHome classificationHome)
        {
            ClassificationHome = classificationHome;
        }

        public IClassificationHome ClassificationHome { get; }

        [HttpGet("list")]
        public async Task<ResultStruct<List<ClassificationEnity>>> List()
        {
            return await ResultFun.AsyncReturn(ClassificationHome.List);
        }

    }
}
