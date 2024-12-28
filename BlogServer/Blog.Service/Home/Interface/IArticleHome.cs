using Blog.Model.Param;
using Blog.Model.Rsult;
using SqlSugar;

namespace Blog.Service.Home.Interface
{
    public interface IArticleHome
    {
        ISqlSugarClient Db { get; }
        Task<PageResult<ArticleFindHomeRsult>> List(ArticleFindHomeParam param);
        Task<ArticleFindHomeRsult> FindOne(IDParam param);
        Task<PageResult<ArticleAndRandmFindHomeRsult>> FindArticleAndRandomWrite(ArticleAndRandomFindHomeParam param);
    }
}
