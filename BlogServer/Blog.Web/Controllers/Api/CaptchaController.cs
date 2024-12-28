using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.Fonts;
using System.Runtime.InteropServices;
using SixLabors.ImageSharp.Drawing.Processing;
using System.Diagnostics;

namespace Blog.Web.Controllers.Api
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CaptchaController : ControllerBase
    {
        public CaptchaController() { }

        [HttpGet]
        public IActionResult GenerateCaptcha()
        {
            Random _random = new Random();
            // 生成随机验证码文本
            string captchaText = GenerateRandomText(4); // 生成6位验证码

            HttpContext.Session.SetString("CaptchaCode", captchaText);

            int size = 20;

            // 创建图像
            using (var image = new Image<Rgba32>((size * 4) - 10, size + 20))
            {
                // 填充背景色
                image.Mutate(ctx => ctx.BackgroundColor(Color.SandyBrown));

                // 绘制验证码文本
                Font? font;
                if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
                {
                    font = SystemFonts.CreateFont("DejaVu Sans", size, FontStyle.Bold);
                }
                else
                {
                    font = SystemFonts.CreateFont("Arial", size, FontStyle.Bold);
                }

                image.Mutate(ctx => ctx.DrawText(captchaText, font, Color.Black, new PointF(10, 10)));

                // 绘制干扰线
                for (int i = 0; i < 10; i++)
                {
                    int x1 = _random.Next(image.Width);
                    int y1 = _random.Next(image.Height);
                    int x2 = _random.Next(image.Width);
                    int y2 = _random.Next(image.Height);
                    image.Mutate(ctx => ctx.DrawLine(Color.Red, 1, new PointF(x1, y1), new PointF(x2, y2)));
                }

                // 保存图像到内存流
                var ms = new MemoryStream();
                image.SaveAsPng(ms);
                ms.Position = 0;  // 重置流的位置

                return File(ms, "image/png");
            }
        }
        private string GenerateRandomText(int length)
        {
            Random _random = new Random();
            const string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            char[] stringChars = new char[length];
            for (int i = 0; i < length; i++)
            {
                stringChars[i] = chars[_random.Next(chars.Length)];
            }
            return new string(stringChars);
        }
    }
}
