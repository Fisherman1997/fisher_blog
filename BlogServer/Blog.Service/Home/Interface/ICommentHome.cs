
using Blog.Model.Param;
using Blog.Model.Rsult;
using SqlSugar;

namespace Blog.Service.Home.Interface
{
    public interface ICommentHome
    {
        ISqlSugarClient Db { get; }
        Task Insert(CommentInsertParam param);
        Task<PageResult<CommentHomeRsult>> List(CommentHomeFindParam param);
    }
}
