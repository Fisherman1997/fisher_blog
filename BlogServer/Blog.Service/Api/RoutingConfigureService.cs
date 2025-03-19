using Blog.Model.Entity;
using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Api.Interface;
using Blog.Utils;
using Newtonsoft.Json;
using SqlSugar;
namespace Blog.Service.Api
{
    public class RoutingConfigureService: IRoutingConfigureService
    {
        public RoutingConfigureService(ISqlSugarClient client)
        {
            Db = client;
        }

        public ISqlSugarClient Db { get; }

        public async Task Insert(RoutingConfigureInsertParam param) 
        {
            if (param.SerialNumber == null || param.SerialNumber == 0)
            { 
                var count = await Db.Queryable<RoutingConfigureInsertParam>().CountAsync();
                param.SerialNumber = count + 1;
            }
            //var element = new RoutingConfigureEnity
            //{
            //    Title = param.Title,
            //    Name = param.Name,
            //    Path = param.Path,
            //    Component = param.Component,
            //    Range = param.Range,
            //    Menu = param.Menu,
            //    Redirect = param.Redirect,
            //    Status = param.Status,
            //    SerialNumber = (int)param.SerialNumber!
            //};
            var element = new RoutingConfigureEnity();
            CommonFun.AssignProps(element, param);
            await Db.Storageable(element).ExecuteCommandAsync();
        }

        public async Task Update(RoutingConfigureUpdateParam param)
        {
            var routingConfigure = await Db.Queryable<RoutingConfigureEnity>()
                .Where(it => it.Id == param.Id)
                .FirstAsync();
            if (routingConfigure == null) throw new NullReferenceException("查不到此路由");

            //routingConfigure.Title = param.Title;
            //routingConfigure.Path = param.Path;
            //routingConfigure.Name = param.Name;
            //routingConfigure.Component = param.Component;
            //routingConfigure.Range = param.Range;
            //routingConfigure.Menu = param.Menu;
            //routingConfigure.Redirect = param.Redirect;
            //routingConfigure.Status = param.Status;
            //routingConfigure.SerialNumber = (int)param.SerialNumber!;

            CommonFun.AssignProps(routingConfigure, param);
            await Db.Storageable(routingConfigure).ExecuteCommandAsync();

        }

        public async Task<List<RoutingConfigureFindRsult>> List(RoutingConfigureFindParam param)
        { 
            var list = await Db.Queryable<RoutingConfigureEnity>()
                .Where(it => it.Primary_id == null && it.Range == param.Range)
                .OrderBy(it => it.SerialNumber, OrderByType.Asc)
                .ToListAsync();

            List<int> ids = list.Select(it => it.Id).ToList();
            var children = await Db.Queryable<RoutingConfigureEnity>()
                .Where(it => it.Primary_id != null && ids.Contains((int)it.Primary_id))
                .ToListAsync();

            var rsult = list.Select(it => {
                var chil = children.Where(cit => cit.Primary_id == it.Id)
                .OrderBy(it => it.SerialNumber)
                .ToList();
                return new RoutingConfigureFindRsult(it, chil);
            }).ToList();
            return rsult;
        }

        public async Task Delete(IDParam param)
        { 
            var lsit = await Db.Queryable<RoutingConfigureEnity>()
                .Where(it => it.Id == param.Id || it.Primary_id == param.Id)
                .ToListAsync();
            var ids = lsit.Select(it => it.Id).ToList();
            await Db.Deleteable<RoutingConfigureEnity>().In(it => it.Id, ids).ExecuteCommandAsync();
        }

        public async Task<List<RoutingConfigureFindRsult>> GetPowerRuoter(IDParam param)
        {
            var user = await Db.Queryable<UserEnity>()
                .Where(it => it.Id == param.Id)
                .FirstAsync();
            var ids = JsonConvert.DeserializeObject<List<int>>(user.Power!);
            var list = await Db.Queryable<RoutingConfigureEnity>()
                .Where(it => ids!.Contains(it.Id))
                .ToListAsync();
            var result = list.Where(it => it.Primary_id == null)
                .Select(it => 
                {
                    var children = list.Where(cit => cit.Primary_id == it.Id).ToList();
                    return new RoutingConfigureFindRsult(it, children);
                })
                .ToList();
            return result;

        }
    }
}
