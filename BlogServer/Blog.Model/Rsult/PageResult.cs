namespace Blog.Model.Rsult
{
    public class PageResult<T>
    {
        public required List<T> List {  get; set; }
        public int Total { get; set; }
    }
}
