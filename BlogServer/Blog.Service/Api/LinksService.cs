using Blog.Model.Entity;
using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Api.Interface;
using Blog.Utils;
using SqlSugar;
using System.Xml.Linq;

namespace Blog.Service.Api
{
    internal class LinksService: ILinksService
    {
        public LinksService(ISqlSugarClient client)
        {
            Db = client;
        }

        public ISqlSugarClient Db { get; }

        public async Task Insert(LinksInsertParam param)
        {
            //var element = new LinksEnity
            //{
            //    Name = param.Name,
            //    Avatar = param.Avatar,
            //    Http_url = param.Http_url,
            //    Status = param.Status,
            //    Description = param.Description
            //};
            var element = new LinksEnity();
            CommonFun.AssignProps(element, param);
            await Db.Storageable(element).ExecuteCommandAsync();
        }

        public async Task Update(LinksUpdateParam param)
        {
            var link = await Db.Queryable<LinksEnity>().Where(it => it.Id == param.Id).FirstAsync();
            //link.Name = param.Name;
            //link.Avatar = param.Avatar;
            //link.Http_url = param.Http_url;
            //link.Status = param.Status;
            //link.Description = param.Description;
            CommonFun.AssignProps(link, param);
            await Db.Storageable(link).ExecuteCommandAsync();
        }

        public async Task<PageResult<LinksEnity>> List(PageParam param)
        {
            RefAsync<int> total = 0;
            var list = await Db.Queryable<LinksEnity>().ToPageListAsync(param.Page, param.PageNum, total);
            return new PageResult<LinksEnity>
            {
                Total = total,
                List = list
            };
        }

        public async Task Delete(IDParam param)
        {
            await Db.Deleteable<LinksEnity>().In(it => it.Id, param.Id).ExecuteCommandAsync();
        }
    }
}
