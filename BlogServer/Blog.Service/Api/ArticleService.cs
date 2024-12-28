using Blog.Model.Entity;
using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Api.Interface;
using Newtonsoft.Json;
using SqlSugar;

namespace Blog.Service.Api
{
    public class ArticleService: IArticleService
    {
        public ArticleService(ISqlSugarClient client, IFileService fileService)
        {
            Db = client;
            FileService = fileService;
        }

        public ISqlSugarClient Db { get; }
        public IFileService FileService { get; }

        public async Task Insert(ArticleInsertParam param)
        {
            var article = new ArticleListEnity
            {
                Title = param.Title,
                CreateDate = DateTime.Now,
                CreateUserId = param.CreateUserId,
                ClassId = param.ClassId,
                Clicks = 0,
                Content = param.Content,
                Cover = param.Cover != null ? JsonConvert.SerializeObject(param.Cover) : null
            };
            await Db.Storageable(article).ExecuteCommandAsync();
        }

        public async Task Update(ArticleUpdateParam param)
        { 
            var article = await Db.Queryable<ArticleListEnity>().Where(it => it.Id == param.Id).FirstAsync();
            article.Title = param.Title;
            article.UpdateTime = DateTime.Now;
            article.Content = param.Content;
            article.Cover = JsonConvert.SerializeObject(param.Cover);
            await Db.Storageable(article).ExecuteCommandAsync();
        }

        public async Task<PageResult<ArticleFindRsult>> List(ArticleFindParam param)
        {
            RefAsync<int> total = 0;
            var list = await Db.Queryable<ArticleListEnity>()
                .WhereIF(param.ClassId != null, it => it.ClassId == param.ClassId)
                .WhereIF(!string.IsNullOrEmpty(param.Title), it => it.Title!.Contains(param.Title!))
                .OrderBy(it => it.CreateDate, OrderByType.Desc)
                .ToPageListAsync(param.Page,param.PageNum, total);
            return new PageResult<ArticleFindRsult>
            {
                List = list.Select(x => new ArticleFindRsult(x, false)).ToList(),
                Total = total
            };
        }

        public async Task<ArticleFindRsult> FindOne(IDParam param)
        {
            var article = await Db.Queryable<ArticleListEnity>().Where(it => it.Id == param.Id).FirstAsync();
            return new ArticleFindRsult(article);
        }

        public async Task Delete(IDParam param)
        {
            var article = await Db.Queryable<ArticleListEnity>().Where(it => it.Id == param.Id).FirstAsync();
            if (article == null) throw new NullReferenceException("数据库中不存在该项");
            FileService.ImgsRemove(JsonConvert.DeserializeObject<List<string>>(article.Cover!)!);
            await Db.Deleteable<ArticleListEnity>().In(it => it.Id, param.Id).ExecuteCommandAsync();
        }
    }
}
