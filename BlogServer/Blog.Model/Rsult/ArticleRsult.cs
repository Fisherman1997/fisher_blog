using Blog.Model.Entity;
using Blog.Utils;
using Newtonsoft.Json;

namespace Blog.Model.Rsult
{
    public class ArticleFindRsult: ArticleListEnity
    {
        public new string[] Cover {  get; set; }
        public ArticleFindRsult(ArticleListEnity enity, bool isContent = true) 
        {
            foreach (var prop in typeof(ArticleListEnity).GetProperties())
            { 
                var value = prop.GetValue(enity);
                prop.SetValue(this, value);
            }
            if (!isContent) Content = null;
            Cover = !string.IsNullOrEmpty(enity.Cover) ? JsonConvert.DeserializeObject<string[]>(enity.Cover)! : Array.Empty<string>();
        }
    }


    public class ArticleFindHomeRsult : ArticleListEnity
    {
        public List<HeadingItem>? Contents { get; set; }
        public new string[] Cover { get; set; }
        public string CreateUserName { get; set; }
        public string className { get; set; }
        public ArticleListEnity? Before { get; set; }
        public ArticleListEnity? After { get; set; }

        /**
         * <summary>构造器</summary>
         * <param name="isContent">是否需要Content属性并进行转换，转换成html</param>
         * **/
        public ArticleFindHomeRsult(
            ArticleListEnity article, 
            ClassificationEnity classification,
            UserEnity user, 
            bool isContent = false, 
            ArticleListEnity? before = null, 
            ArticleListEnity? after = null)
        {
            foreach (var prop in typeof(ArticleListEnity).GetProperties())
            {
                var value = prop.GetValue(article);
                prop.SetValue(this, value);
            }
            if (isContent)
            {
                Content = GetMarkdonwSwitchHTML.GetToHtml(article.Content!);
                Contents = ProcessingText.GetTitle(Content);
            }
            else
            {
                Content = ProcessingText.GetChinese(article.Content!.Substring(0, 130));
            }
            Cover = !string.IsNullOrEmpty(article.Cover) ? JsonConvert.DeserializeObject<string[]>(article.Cover)! : Array.Empty<string>();
            CreateUserName = user.Name ?? string.Empty;
            className = classification.Name ?? string.Empty;
            Before = before;
            After = after;
        }
    }

    public class ArticleAndRandmFindHomeRsult 
    {
        public int Id { get; set; }
        public required string Content { get; set; }
        public required string[] CoverList { get; set; }
        public required string Title { get; set; }
        public required DateTime CreateDate { get; set; }
        public int? Clicks { get; set; }
        public required string CreateUserName { get; set; }
        public required string ClassName { get; set; }
        public required string[] Portrait { get; set; }
    }
}
