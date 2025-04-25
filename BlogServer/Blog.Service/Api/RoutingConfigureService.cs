using Blog.Model.Entity;
using Blog.Model.Enum;
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
                var count = await Db.Queryable<RoutingConfigureEnity>().CountAsync();
                param.SerialNumber = count + 1;
            }
            if (param.Primary_id != null) 
            { 
                var primary = await Db.Queryable<RoutingConfigureEnity>().In(param.Primary_id).SingleAsync();
                if (primary == null) throw new NullReferenceException("错误父级不存在");
                if (primary.Contents == ContentsEnum.No) throw new NullReferenceException("该路由不是目录无法添加子级");
                if (primary.Primary_id != null) throw new NullReferenceException("只有一级目录才能添加子级");
            }
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
            if (routingConfigure.Contents == ContentsEnum.Yes && param.Contents == ContentsEnum.No)
            {
                var children = await Db.Queryable<RoutingConfigureEnity>().Where(it => it.Primary_id == routingConfigure.Id).ToListAsync();
                if (children != null && children.Count != 0) throw new InvalidOperationException("必须删除所以子路由才可以修改为“不是目录项”");
            }
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
            var idsNotPrimaryForChildren = list.Where(it =>
                {
                    return it.Primary_id != null && !(ids!.Contains((int)it.Primary_id));
                })
                .ToList();

            foreach (var it in idsNotPrimaryForChildren)
            {
                var isPrimary = result.Find(cit => it.Primary_id == cit.Id);
                if (isPrimary != null)
                {
                    if (isPrimary.Children == null) isPrimary.Children = new List<RoutingConfigureEnity>();
                    isPrimary.Children.Add(it);
                }
                else
                {
                    var primary = await Db.Queryable<RoutingConfigureEnity>().Where(r => r.Id == it.Primary_id).FirstAsync();
                    if (primary == null)
                    {
                        // 如果数据库中不存在对应的主节点，可以根据业务决定抛错或跳过
                        continue;
                    }
                    var children = new List<RoutingConfigureEnity>() { it };
                    result.Add(new RoutingConfigureFindRsult(primary, children));
                }

            }
            return result;

        }
    }
}
