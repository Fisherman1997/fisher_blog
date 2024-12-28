using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Api.Interface;
using Blog.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Web.Controllers.Api
{
    [Route("api/user")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        public UserController(IUserService userService)
        {
            UserService = userService;
        }

        public IUserService UserService { get; }

        [HttpPost("insert")]
        public async Task<ResultStruct> Insert([FromBody] UserInsertParam param)
        {
            return await ResultFun.AsyncReturn(param, UserService.Insert);
        }

        [HttpPost("list")]
        public async Task<ResultStruct<PageResult<UserListRsult>>> List([FromBody] UserFindParam param)
        {
            return await ResultFun.AsyncReturn(param, UserService.List);
        }

        [HttpPost("update")]
        public async Task<ResultStruct> Update([FromBody] UserUpdateParam param)
        {
            return await ResultFun.AsyncReturn(param, UserService.Update);
        }

        [HttpPost("updatePassword")]
        public async Task<ResultStruct> UpdatePassword([FromBody] UserUpdatePasswordParam param)
        {
            return await ResultFun.AsyncReturn(param, UserService.UpdatePassword);
        }

        [HttpPost("updateUserPower")]
        public async Task<ResultStruct> UpdateUserPower([FromBody] UserUpdatePowerParam param)
        {
            return await ResultFun.AsyncReturn(param, UserService.UpdateUserPower);
        }

        [HttpPost("getUserPower")]
        public async Task<ResultStruct<int[]>> GetUserPower([FromBody] IDParam param)
        {
            return await ResultFun.AsyncReturn(param, UserService.GetUserPower);
        }

        [HttpDelete("delete")]
        public async Task<ResultStruct> Delete([FromBody] IDParam param)
        {
            return await ResultFun.AsyncReturn(param, UserService.Delete);
        }
    }
}
