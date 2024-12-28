
using Blog.Model.Entity;
using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Home.Interface;
using Blog.Utils;
using Newtonsoft.Json;
using SqlSugar;
using System.Diagnostics.Metrics;

namespace Blog.Service.Home
{
    public class ArticleHome: IArticleHome
    {
        public ArticleHome(ISqlSugarClient client)
        {
            Db = client;
        }

        public ISqlSugarClient Db { get; }

        public async Task<PageResult<ArticleFindHomeRsult>> List(ArticleFindHomeParam param)
        {
            RefAsync<int> total = 0;
            var list = await Db.Queryable<ArticleListEnity>()
                  .LeftJoin<ClassificationEnity>((al, c) => al.ClassId == c.Id)
                  .LeftJoin<UserEnity>((al, c, u) => al.CreateUserId == u.Id)
                  .WhereIF(param.ClassId != null, (al, c, u) => al.ClassId == param.ClassId)
                  .WhereIF(!string.IsNullOrEmpty(param.Search), (al, c, u) => al.Title!.Contains(param.Search!))
                  .OrderBy((al, c, u) => al.CreateDate, OrderByType.Desc)
                  .Select((al, c, u) => new { al, c, u })
                  .ToPageListAsync(param.Page,param.PageNum,total);
            return new PageResult<ArticleFindHomeRsult>
            {  
                List = list.Select(x => new ArticleFindHomeRsult(x.al,x.c,x.u)).ToList(),
                Total = total 
            };
        }

        public async Task<ArticleFindHomeRsult> FindOne(IDParam param)
        {
            var result = await Db.Queryable<ArticleListEnity>()
                .LeftJoin<ClassificationEnity>((al, c) => al.ClassId == c.Id)
                .LeftJoin<UserEnity>((al, c, u) => al.CreateUserId == u.Id)
                .Where((al, c, u) => al.Id == param.Id)
                .Select((al, c, u) => new { al, c, u })
                .FirstAsync();
            if (result == null) throw new NullReferenceException("数据库中不存在该项");
            result.al.Clicks = result.al.Clicks + 1;
            var before = await Db.Queryable<ArticleListEnity>()
                .Where(it => it.CreateDate < result.al.CreateDate)
                .OrderBy(it => it.CreateDate, OrderByType.Desc)
                .FirstAsync();
            var after = await Db.Queryable<ArticleListEnity>()
                .Where(it => it.CreateDate > result.al.CreateDate)
                .OrderBy(it => it.CreateDate, OrderByType.Asc)
                .FirstAsync();
            await Db.Storageable(result.al).ExecuteCommandAsync();
            return new ArticleFindHomeRsult(
                result.al, 
                result.c, 
                result.u, 
                true,
                before,
                after);
        }

        public async Task<PageResult<ArticleAndRandmFindHomeRsult>> FindArticleAndRandomWrite(ArticleAndRandomFindHomeParam param)
        {
            // 构建查询条件
            var article = Db.Queryable<ArticleListEnity>()
                .LeftJoin<ClassificationEnity>((al, c) => al.ClassId == c.Id)
                .LeftJoin<UserEnity>((al, c, u) => al.CreateUserId == u.Id)
                .WhereIF(!string.IsNullOrEmpty(param.Search), (al, c, u) => al.Content!.Contains(param.Search!) || al.Title!.Contains(param.Search!))
                .Select((al, c, u) => new 
                {
                    al.Id,
                    Content = al.Content!.Substring(1, 130), // 截取文章内容的前130个字符
                    Cover_list = al.Cover, // 假设 Cover 是一个 JSON 字符串，需要反序列化为 List<string>
                    al.Title,
                    al.CreateDate,
                    al.Clicks,
                    CreateUserName = u.Name,
                    ClassName = c.Name,
                    u.Portrait // 假设 Portrait 是一个 JSON 字符串，反序列化后是字符串
                });

            // 使用 UNION 获取 random_write 表的结果
            var random = Db.Queryable<RandomWriteEnity>()
                .LeftJoin<UserEnity>((rw, u) => rw.CreateUserId == u.Id)
                .WhereIF(!string.IsNullOrEmpty(param.Search), (rw, u) => rw.Content!.Contains(param.Search!))
                .Select((rw, u) => new
                {
                    rw.Id,
                    rw.Content,
                    rw.Cover_list,
                    Title = null as string,  // Title 为空
                    rw.CreateDate,
                    rw.Clicks,
                    CreateUserName = u.Name,
                    ClassName = null as string,  // ClassName 为空
                    u.Portrait 
                });

            var finalQuery = Db.UnionAll(article, random!).OrderBy(it => it.CreateDate,OrderByType.Desc);

            RefAsync<int> total = 0;

            // 获取分页数据
            var list = await finalQuery.ToPageListAsync(param.Page,param.PageNum, total);

            return new PageResult<ArticleAndRandmFindHomeRsult>
            {
                List = list.Select(it => {
                    return new ArticleAndRandmFindHomeRsult
                    {
                        Id = it.Id,
                        ClassName = it.ClassName!,
                        Clicks = it.Clicks,
                        Content = it.Title == null ? it.Content : ProcessingText.GetChinese(it.Content),
                        CreateDate = (DateTime)it.CreateDate!,
                        CoverList = !string.IsNullOrEmpty(it.Cover_list) ? JsonConvert.DeserializeObject<string[]>(it.Cover_list)! : Array.Empty<string>(),
                        Portrait = !string.IsNullOrEmpty(it.Portrait) ? JsonConvert.DeserializeObject<string[]>(it.Portrait)! : Array.Empty<string>(),
                        CreateUserName = it.CreateUserName!,
                        Title = it.Title!
                    };
                }).ToList(),
                Total = total
            };
        }
    }
}
