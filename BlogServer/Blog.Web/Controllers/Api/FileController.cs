using Blog.Service.Api.Interface;
using Blog.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Web.Controllers.Api
{
    [Route("api/file")]
    [ApiController]
    [Authorize]
    public class FileController : ControllerBase
    {
        public FileController(IFileService fileService)
        {
            FileService = fileService;
        }

        public IFileService FileService { get; }

        [HttpPost("img/add")]
        //[Consumes("multipart/form-data")] // 指定接受的内容类型
        public async Task<ResultStruct<List<string>>> ImgsAdd([FromForm] List<IFormFile> files)
        {
            return await ResultFun.AsyncReturn(files, FileService.ImgsAdd);
        }


        [HttpPost("img/remove")]
        public ResultStruct ImgsRemove([FromBody] List<string> fileNamas)
        {
            return ResultFun.Return(fileNamas, FileService.ImgsRemove);
        }
    }
}
