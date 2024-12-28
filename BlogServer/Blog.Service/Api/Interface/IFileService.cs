
using Microsoft.AspNetCore.Http;

namespace Blog.Service.Api.Interface
{
    public interface IFileService
    {
        Task<List<string>> ImgsAdd(List<IFormFile> files);
        void ImgsRemove(List<string> fileNames);
    }
}
