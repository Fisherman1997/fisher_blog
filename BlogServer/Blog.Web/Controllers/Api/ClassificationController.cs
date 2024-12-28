using Blog.Model.Entity;
using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Api.Interface;
using Blog.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Web.Controllers.Api
{
    [Route("api/class")]
    [ApiController]
    [Authorize]
    public class ClassificationController : ControllerBase
    {
        public ClassificationController(IClassificationService classificationService)
        {
            ClassificationService = classificationService;
        }

        public IClassificationService ClassificationService { get; }

        [HttpPost("insert")]
        public async Task<ResultStruct> Insert([FromBody] ClassInsertParam param)
        {
            return await ResultFun.AsyncReturn(param, ClassificationService.Insert);
        }

        [HttpPost("list")]
        public async Task<ResultStruct<List<ClassificationEnity>>> List([FromBody] ClassFindParam param)
        {
            return await ResultFun.AsyncReturn(param, ClassificationService.List);
        }

        [HttpPost("update")]
        public async Task<ResultStruct> Update([FromBody] ClassUpdateParam param)
        {
            return await ResultFun.AsyncReturn(param, ClassificationService.Update);
        }

        [HttpPost("findOne")]
        public async Task<ResultStruct<ClassificationEnity>> FindOne([FromBody] IDParam param)
        {
            return await ResultFun.AsyncReturn(param, ClassificationService.FindOne);
        }

        [HttpDelete("delete")]
        public async Task<ResultStruct> Delete([FromBody] IDParam param)
        {
            return await ResultFun.AsyncReturn(param, ClassificationService.Delete);
        }
    }
}
