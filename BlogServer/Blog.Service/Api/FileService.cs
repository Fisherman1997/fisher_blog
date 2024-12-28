using Blog.Service.Api.Interface;
using Blog.Utils;
using Microsoft.AspNetCore.Http;
using System.Runtime.InteropServices;

namespace Blog.Service.Api
{
    public class FileService: IFileService
    {
        private readonly string uploadFolder = Path.Combine(GlobalContext.wwwrooturl!, "imgS");
        public FileService() 
        {
            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }
        }
        public async Task<List<string>> ImgsAdd(List<IFormFile> files)
        {


            var result = new List<string>();

            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    var extension = Path.GetExtension(file.FileName); // 获取文件扩展名
                    var fileName = $"{GenerateFileName()}{extension}"; // 生成新文件名
                    var filePath = Path.Combine(uploadFolder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream); // 保存文件
                    }

                    result.Add($"/imgS/{fileName}"); // 添加文件 URL 到结果列表
                }
            }

            // 返回响应
            return result;
        }

        public void ImgsRemove(List<string> fileNames)
        {
            string state = "" ;  // 错误状态信息

            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                for (int i = 0; i < fileNames.Count; i++)
                {
                    fileNames[i] = fileNames[i].Replace("/", "\\");
                }
            }

            // 删除每个文件
            foreach (var item in fileNames)
            {
                var filePath = GlobalContext.wwwrooturl + item;
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);  // 删除文件
                }
                else
                {
                    state += $"无法删除不存在的图片：{item}；\n";
                }
            }
            if (state.Length != 0) throw new Exception(state);
        }

        // 生成文件名的方法（示例：使用 GUID）
        private string GenerateFileName()
        {
            return Guid.NewGuid().ToString("N"); // 生成唯一标识符作为文件名
        }

    }
}
