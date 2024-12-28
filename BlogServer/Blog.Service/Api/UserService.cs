using Blog.Model.Entity;
using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Api.Interface;
using Blog.Utils;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using SqlSugar;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace Blog.Service.Api
{
    public class UserService : IUserService
    {
        public ISqlSugarClient Db { get; }
        public IFileService FileService { get; }

        public UserService(ISqlSugarClient sqlSugar, IFileService fileService)
        {
            Db = sqlSugar;
            FileService = fileService;
        }

        public async Task<PageResult<UserListRsult>> List(UserFindParam param)
        {
            RefAsync<int> total = 0;
            var list = await Db.Queryable<UserEnity>()
                .WhereIF(!string.IsNullOrEmpty(param.Name), it => it.Name!.Contains(param.Name!))
                .ToPageListAsync(param.Page, param.PageNum, total);
            return new PageResult<UserListRsult>
            {
                Total = total,
                List = list.Select(it => new UserListRsult(it)).ToList()
            };
        }

        public async Task<UserTokenRsult> CheckToken(string token)
        { 
            var user = await Db.Queryable<UserEnity>().Where(it => it.Token == token).FirstAsync();
            if (user == null) throw new NullReferenceException("已过期");
            user.Password = null ;
            user.Power = null ;
            return new UserTokenRsult(user);
        }

        public async Task Insert(UserInsertParam param)
        { 
            var user = await Db.Queryable<UserEnity>()
                .Where(it => it.Code == param.Code || it.Name == param.Name)
                .FirstAsync();
            if (user != null) {
                string masg = user.Code == param.Code && user.Name == param.Name ? "已存在相同的账号和名称" :
                    user.Name == param.Name ? "已存在相同的名称" : "已存在相同的账号";
                throw new InvalidOperationException(masg);
            }
            var save = new UserEnity
            {
                Name = param.Name,
                Code = param.Code,
                Status = param.Status,
                Password = GetMd5Hash.Md5HashPassword(param.Password),
                Portrait = param.Portrait != null ? JsonConvert.SerializeObject(param.Portrait) : null,
            };
            await Db.Storageable(save).ExecuteCommandAsync();
        }


        public async Task Update(UserUpdateParam param)
        {
            var userExclude = await Db.Queryable<UserEnity>()
                .Where(it => (it.Code == param.Code || it.Name == param.Name) && it.Id != param.Id)
                .FirstAsync();
            if (userExclude != null)
            {
                string masg = userExclude.Code == param.Code && userExclude.Name == param.Name ? "已存在相同的账号和名称" :
                    userExclude.Name == param.Name ? "已存在相同的名称" : "已存在相同的账号";
                throw new InvalidOperationException(masg);
            }
            var user = await Db.Queryable<UserEnity>().Where(it => it.Id == param.Id).FirstAsync();
            user.Name = param.Name;
            user.Code = param.Code;
            user.Status = param.Status;
            user.Portrait = JsonConvert.SerializeObject(param.Portrait);
            await Db.Storageable(user).ExecuteCommandAsync();
        }

        public async Task UpdatePassword(UserUpdatePasswordParam param)
        {
            var user = await Db.Queryable<UserEnity>().Where(it => it.Id == param.Id).FirstAsync();
            if (user == null) throw new NullReferenceException("找不到该用户");
            if (user.Password != GetMd5Hash.Md5HashPassword(param.Before_password)) throw new InvalidOperationException("请输入正确的密码");
            user.Password = GetMd5Hash.Md5HashPassword(param.Password);
            await Db.Storageable(user).ExecuteCommandAsync();
        }

        public async Task Delete(IDParam param)
        {
            var user = await Db.Queryable<UserEnity>().Where(it => it.Id == param.Id).FirstAsync();
            var files = JsonConvert.DeserializeObject<List<string>>(user.Portrait!)!;
            if (files.Count != 0) FileService.ImgsRemove(files);
            await Db.Deleteable<UserEnity>().In(it => it.Id,param.Id).ExecuteCommandAsync();
        }

        public async Task UpdateUserPower(UserUpdatePowerParam param)
        {
            var user = await Db.Queryable<UserEnity>().Where(it => it.Id == param.Id).FirstAsync();
            if (user == null) throw new NullReferenceException("找不到该用户");
            user.Power = JsonConvert.SerializeObject(param.Power);
            await Db.Storageable(user).ExecuteCommandAsync();
        }

        public async Task<int[]> GetUserPower(IDParam param)
        {
            var user = await Db.Queryable<UserEnity>().Where(it => it.Id == param.Id).FirstAsync();
            if (user == null) throw new NullReferenceException("找不到该用户");
            return !string.IsNullOrEmpty(user.Power) ? JsonConvert.DeserializeObject<int[]>(user.Power)! : Array.Empty<int>();
        }

        /**
         * <summary>登录</summary>
         * **/
        public async Task<SignInRsult> SignIn(SignInParam param)
        {
            UserEnity user = await Db.Queryable<UserEnity>().Where(it => it.Code == param.Code).FirstAsync();
            if (user == null) throw new NullReferenceException("查无此人");
            if (user.Password != GetMd5Hash.Md5HashPassword(param.Password)) throw new InvalidOperationException("密码错误");
            if (user.Status == 0) throw new InvalidOperationException("该账号未审核启用，请联系管理员启用");
            if (string.IsNullOrEmpty(user.Power) || user.Power.Length == 0) throw new InvalidOperationException("账号无权限，请联系管理员分配权限");
            user.Token = GenerateJwtToken(user.Code!);
            await Db.Storageable(user).ExecuteCommandAsync();
            return new SignInRsult
            {
                Token = user.Token,
                UserInfo = new UserListRsult(user)
            };

        }

        /**
         * <summary>注册token</summary>
         * **/
        public string GenerateJwtToken(string userId)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(GlobalContext.jwtConfig!.Key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: GlobalContext.jwtConfig.Issuer,
                audience: GlobalContext.jwtConfig.Audience,
                claims: claims,
                expires: DateTime.Now.AddMonths(30),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

}
