using Blog.Model.Entity;
using Newtonsoft.Json;

namespace Blog.Model.Rsult
{
    public class RandomWriteFindRsult: RandomWriteEnity
    {
        public new string[]? Cover_list {  get; set; }
        public RandomWriteFindRsult(RandomWriteEnity enity)
        {
            foreach (var porp in typeof(RandomWriteEnity).GetProperties())
            {
                var value = porp.GetValue(enity);
                porp.SetValue(this, value);
            }
            Cover_list = !string.IsNullOrEmpty(enity.Cover_list) ? JsonConvert.DeserializeObject<string[]>(enity.Cover_list!) : Array.Empty<string>();
        }
    }

    public class RandomWriteFindHomeRsult : RandomWriteEnity
    {
        public new string[]? Cover_list { get; set; }

        public string[] Portrait {  get; set; }
        public string CreateUserName { get; set; }
        public RandomWriteFindHomeRsult(RandomWriteEnity enity, UserEnity user)
        {
            foreach (var porp in typeof(RandomWriteEnity).GetProperties())
            {
                var value = porp.GetValue(enity);
                porp.SetValue(this, value);
            }
            Cover_list = !string.IsNullOrEmpty(enity.Cover_list) ? JsonConvert.DeserializeObject<string[]>(enity.Cover_list!) : Array.Empty<string>();
            Portrait = !string.IsNullOrEmpty(user.Portrait) ? JsonConvert.DeserializeObject<string[]>(user.Portrait!)! : Array.Empty<string>();
            CreateUserName = user.Name!;
        }
    }
}
