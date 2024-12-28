using Blog.Model.Entity;
using Blog.Model.Param;
using Blog.Model.Rsult;
using SqlSugar;

namespace Blog.Service.Api.Interface
{
    public interface ICommentService
    {
        ISqlSugarClient Db { get; }
        Task<PageResult<CommentEnity>> List(CommentFindParam param);
        Task Update(CommentUpdateParam param);
        Task Delete(IDParam param);
    }
}
