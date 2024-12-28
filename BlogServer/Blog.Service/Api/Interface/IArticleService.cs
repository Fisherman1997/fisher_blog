using Blog.Model.Param;
using Blog.Model.Rsult;
using SqlSugar;

namespace Blog.Service.Api.Interface
{
    public interface IArticleService
    {
        ISqlSugarClient Db { get; }
        IFileService FileService { get; }
        Task Insert(ArticleInsertParam param);
        Task Update(ArticleUpdateParam param);
        Task<PageResult<ArticleFindRsult>> List(ArticleFindParam param);
        Task<ArticleFindRsult> FindOne(IDParam param);
        Task Delete(IDParam param);
    }
}
