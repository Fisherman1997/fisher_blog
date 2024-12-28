
using Blog.Model.Entity;

namespace Blog.Model.Rsult
{
    public class CommentHomeRsult: CommentEnity
    {

        public List<CommentEnity>? ChildList { get; set; }
        public CommentHomeRsult(CommentEnity enity, List<CommentEnity>? list = null)
        {
            foreach (var prop in typeof(CommentEnity).GetProperties())
            { 
                var value = prop.GetValue(enity);
                prop.SetValue(this, value);
            }
            ChildList = list ?? new List<CommentEnity>();
        }
    }
}
