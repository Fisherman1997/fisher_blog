using Blog.Model.Rsult;
using SqlSugar;

namespace Blog.Service.Api.Interface
{
    public interface IVisitService
    {
        public ISqlSugarClient Client { get; }
        Task<List<VisitRsult>> GetVisit();
    }
}
