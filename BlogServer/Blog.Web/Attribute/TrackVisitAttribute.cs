namespace Blog.Web.Attributes
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, Inherited = true)]
    public class TrackVisitAttribute : Attribute
    {
    }

}
