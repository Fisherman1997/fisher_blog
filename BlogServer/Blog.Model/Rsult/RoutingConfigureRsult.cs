
using Blog.Model.Entity;

namespace Blog.Model.Rsult
{
    public class RoutingConfigureFindRsult: RoutingConfigureEnity
    {
        public List<RoutingConfigureEnity>? Children { get; set; }

        public RoutingConfigureFindRsult(RoutingConfigureEnity Enity, List<RoutingConfigureEnity>? children)
        {
            foreach (var prop in typeof(RoutingConfigureEnity).GetProperties())
            {
                var value = prop.GetValue(Enity);
                prop.SetValue(this, value);
            }
            Children = children;
        }
    }
}
