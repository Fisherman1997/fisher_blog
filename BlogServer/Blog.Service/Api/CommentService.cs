using Blog.Model.Entity;
using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Api.Interface;
using SqlSugar;
namespace Blog.Service.Api
{
    public class CommentService: ICommentService
    {
        public CommentService(ISqlSugarClient client)
        {
            Db = client;
        }

        public ISqlSugarClient Db { get; }

        public async Task<PageResult<CommentEnity>> List(CommentFindParam param)
        {
            RefAsync<int> total = 0;
            var list = await Db.Queryable<CommentEnity>()
                .WhereIF(!string.IsNullOrEmpty(param.ArticleName), it => it.ArticleId!.Contains(param.ArticleName!))
                .WhereIF(!string.IsNullOrEmpty(param.Content), it => it.Content!.Contains(param.Content!))
                .OrderBy(it => it.CreateDate, OrderByType.Desc)
                .ToPageListAsync(param.Page, param.PageNum, total);
            return new PageResult<CommentEnity> 
            { 
                Total = total,
                List = list
            };
        }

        public async Task Update(CommentUpdateParam param)
        {
            var element = await Db.Queryable<CommentEnity>().Where(it => it.Id == param.Id).FirstAsync();
            if (element == null) throw new NullReferenceException("该项不存在数据库中，为null");
            element.Content = param.Content;
            await Db.Storageable(element).ExecuteCommandAsync();
        }

        public async Task Delete(IDParam param)
        {
            await Db.Deleteable<CommentEnity>().In(it => it.Id, param.Id).ExecuteCommandAsync();
        }
    }
}
