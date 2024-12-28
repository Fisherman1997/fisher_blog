using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Api.Interface;
using Blog.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Blog.Web.Controllers.Api
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public LoginController(IUserService userService)
        {
            UserService = userService;
        }

        public IUserService UserService { get; }

        [HttpPost("signIn")]
        public async Task<ResultStruct<SignInRsult>> Login([FromBody] SignInParam param)
        {
            var CaptchaCode = HttpContext.Session.GetString("CaptchaCode");
            if (CaptchaCode.IsNullOrEmpty()) return ResultFun.error<SignInRsult>("验证码过期");
            if (param.Captcha.ToLower() != CaptchaCode!.ToLower()) return ResultFun.error<SignInRsult>("验证码错误");

            return await ResultFun.AsyncReturn(param, UserService.SignIn);
        }

        [HttpPost("checkToken")]
        [Authorize]
        public async Task<ResultStruct<UserTokenRsult>> CheckToken([FromBody] ChankTokenParam param)
        {
            return await ResultFun.AsyncReturn(param.Token, UserService.CheckToken);
        }
    }
}
