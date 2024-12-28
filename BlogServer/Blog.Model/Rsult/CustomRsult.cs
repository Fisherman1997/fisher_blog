using Blog.Model.Entity;
using Blog.Utils;

namespace Blog.Model.Rsult
{
    public class CustomFindRsult: CustomEnity
    {
        public CustomFindRsult(CustomEnity enity, bool isContent = true) 
        {
            foreach (var prop in typeof(CustomEnity).GetProperties())
            { 
                var value = prop.GetValue(enity);
                prop.SetValue(this, value);
            }

            if (!isContent) Content = null;
        }
    }
    public class CustomFindHomeRsult : CustomEnity
    {
        public CustomFindHomeRsult(CustomEnity enity, bool isContent = true)
        {
            foreach (var prop in typeof(CustomEnity).GetProperties())
            {
                var value = prop.GetValue(enity);
                prop.SetValue(this, value);
            }

            Content = GetMarkdonwSwitchHTML.GetToHtml(enity.Content!);
        }
    }
}
