using Blog.Model.Entity;
using Blog.Utils;
using SqlSugar;


namespace Blog.Data
{
    public class DbMysqlContext
    {
        private static readonly ConnectionConfig connectionConfig = new ConnectionConfig()
        {
            ConnectionString = GlobalContext.systmConfig!.DefaultConnection,
            DbType = DbType.MySql,
            IsAutoCloseConnection = true
        };
        public ISqlSugarClient GetDb()
        {
            var db = new SqlSugarClient(connectionConfig);

            if (db == null) throw new NullReferenceException("数据库上下文启动失败");
            return db;
        }

        public static void SetInitTables()
        {
            var db = new SqlSugarClient(connectionConfig);

            if (db == null) throw new NullReferenceException("数据库上下文启动失败");
            //Console.WriteLine("chank");
            db.CodeFirst.SetStringDefaultLength(255)
                .InitTables(
                    typeof(ArticleListEnity),
                    typeof(ClassificationEnity),
                    typeof(CommentEnity),
                    typeof(CustomEnity),
                    typeof(DailyVisitEnity),
                    typeof(RandomWriteEnity),
                    typeof(RoutingConfigureEnity),
                    typeof(UserEnity),
                    typeof(LinksEnity)
                 );

            Console.WriteLine("初始化成功！");
        }
    }
}
