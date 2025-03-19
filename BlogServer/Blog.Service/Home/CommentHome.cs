using Blog.Model.Entity;
using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Api.Interface;
using Blog.Service.Home.Interface;
using Blog.Utils;
using SqlSugar;

namespace Blog.Service.Home
{
    public class CommentHome: ICommentHome
    {
        public CommentHome(ISqlSugarClient client, IEmailService emailService)
        {
            Db = client;
            EmailService = emailService;
        }

        public ISqlSugarClient Db { get; }
        public IEmailService EmailService { get; }

        public async Task Insert(CommentInsertParam param)
        {

            //var element = new CommentEnity
            //{
            //    ArticleId = param.ArticleId,
            //    CreateDate = DateTime.Now,
            //    ParentId = param.ParentId,
            //    Qq = param.Qq,
            //    ReplyName = param.ReplyName,
            //    Content = param.Content,
            //    ReviewerName = param.ReviewerName,
            //    Httpsrc = param.Httpsrc
            //};

            var element = new CommentEnity();
            CommonFun.AssignProps(element, param,nameof(CommentEnity.Qq));
            element.CreateDate = DateTime.Now;

            if (param.ReplyQQ != element.Qq)
            {
                try
                {
                    await EmailService.SendEmailAsync(param.ReplyQQ, element, param.ArticleUrl);
                }
                catch (Exception ex)
                {
                    throw new Exception("邮箱发送失败，不知道为啥总之就是失败了，看看你的QQ对不对" + ex.ToString());
                }
            }
            await Db.Storageable(element).ExecuteCommandAsync();
        }

        public async Task<PageResult<CommentHomeRsult>> List(CommentHomeFindParam param)
        {
            RefAsync<int> total = 0;
            var lsit = await Db.Queryable<CommentEnity>()
                .Where(it => it.ArticleId == param.ArticleId && it.ParentId == null)
                .OrderBy(it => it.CreateDate, OrderByType.Desc)
                .ToPageListAsync(param.Page,param.PageNum,total);
            var parenArr = lsit.Select(it => it.Id).ToList();
            var child = await Db.Queryable<CommentEnity>()
                .Where(it => it.ParentId.HasValue && parenArr.Contains(it.ParentId.Value))
                .ToListAsync();
            var result = lsit.Select(it =>
            {
                var childList = child.Where(cit => cit.ParentId == it.Id).ToList();
                return new CommentHomeRsult(it, childList);
            }).ToList();
            return new PageResult<CommentHomeRsult>
            {
                List = result,
                Total = total + child.Count
            };
        }
    }
}
