using Blog.Model.Entity;
using Blog.Model.Param;
using Blog.Model.Rsult;
using SqlSugar;

namespace Blog.Service.Api.Interface
{
    public interface IUserService
    {
        ISqlSugarClient Db { get; }

        string GenerateJwtToken(string userId);
        Task<SignInRsult> SignIn(SignInParam param);
        Task<UserTokenRsult> CheckToken(string token);
        Task Insert(UserInsertParam param);
        Task<PageResult<UserListRsult>> List(UserFindParam param);
        Task Update(UserUpdateParam param);
        Task UpdatePassword(UserUpdatePasswordParam param);
        Task Delete(IDParam param);
        Task UpdateUserPower(UserUpdatePowerParam param);
        Task<int[]> GetUserPower(IDParam param);
    }
}
