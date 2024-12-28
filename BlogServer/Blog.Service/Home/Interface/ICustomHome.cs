using Blog.Model.Param;
using Blog.Model.Rsult;
using SqlSugar;


namespace Blog.Service.Home.Interface
{
    public interface ICustomHome
    {
        ISqlSugarClient Db { get; }
        Task<CustomFindHomeRsult> Find(NameParam param);
    }
}
