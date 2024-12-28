using System.Text.RegularExpressions;

namespace Blog.Utils
{
    public class HeadingItem
    {
        public int HLevel { get; set; }  // 标题层级
        public required string Id { get; set; }    // id
        public required string Title { get; set; } // 标题文本
        public int Level { get; set; }    // 树形结构中的层级
        public List<HeadingItem>? Children { get; set; } = new List<HeadingItem>(); // 子级
    }
    public class ProcessingText
    {

        // 从html h标签 读取目录
        public static List<HeadingItem> GetTitle(string content)
        {
            var type = new[] { "h1", "h2", "h3", "h4", "h5", "h6" };
            var tempArr = new List<HeadingItem>();

            var regex = new Regex(@"<h[1-6].*?</h[1-6]>", RegexOptions.IgnoreCase);
            var matches = regex.Matches(content);

            foreach (Match match in matches)
            {
                var item = match.Value.Replace("\n", "").Trim();
                var hLevel = Array.IndexOf(type, item.Substring(1, 2)) + 1;

                // 提取 id
                var idMatch = Regex.Match(item, @"id=""(.*?)""");
                var id = idMatch.Success ? idMatch.Groups[1].Value : string.Empty;

                // 提取标题文本
                var titleMatch = Regex.Match(item, @">.*?</");
                var title = titleMatch.Success ? titleMatch.Value.Substring(1, titleMatch.Length - 3) : string.Empty;

                tempArr.Add(new HeadingItem
                {
                    HLevel = hLevel,
                    Id = id,
                    Title = title
                });
            }

            return ToTree(tempArr);
        }

        // 转换为树形结构
        private static List<HeadingItem> ToTree(List<HeadingItem> flatArr)
        {
            var tree = new List<HeadingItem>();
            var copyArr = new List<HeadingItem>(flatArr);

            // 根据指定级别查找该级别的子孙级，并删除掉已经查找到的子孙级
            List<HeadingItem> GetChildrenByLevel(HeadingItem currentLevelItem, List<HeadingItem> arr, int level)
            {
                if (currentLevelItem == null)
                    return new List<HeadingItem>();

                int minusCurrentLevel = -currentLevelItem.HLevel;
                var children = new List<HeadingItem>();

                for (int i = 0; i < arr.Count; i++)
                {
                    var levelItem = arr[i];
                    if (-levelItem.HLevel < minusCurrentLevel)
                    {
                        children.Add(levelItem);
                    }
                    else
                    {
                        break;
                    }
                }

                // 删除已找到的子孙级
                if (children.Any())
                {
                    arr.RemoveRange(0, children.Count);
                }

                return children;
            }

            // 构建树形结构
            void GetTree(List<HeadingItem> result, List<HeadingItem> arr, int level)
            {
                if (arr.Count == 0)
                    return;

                // 取出数组的第一项，并将其添加到结果集
                var currentItem = arr.First();
                arr.RemoveAt(0);

                currentItem.Level = level;
                result.Add(currentItem);

                while (arr.Any())
                {
                    if (currentItem == null)
                        return;

                    // 获取当前级别的子孙级
                    var children = GetChildrenByLevel(currentItem, arr, level);

                    if (!children.Any())
                    {
                        currentItem = arr.First();
                        arr.RemoveAt(0);
                        currentItem.Level = level;
                        if (currentItem != null)
                            result.Add(currentItem);
                        continue;
                    }

                    currentItem.Children = new List<HeadingItem>();
                    // 递归查找子孙级
                    GetTree(currentItem.Children, children, level + 1);
                }
            }

            GetTree(tree, copyArr, 1);

            return tree;
        }


        public static string GetChinese(string strValue)
        {
            if (string.IsNullOrEmpty(strValue)) return string.Empty;
            var reg = new Regex("[\u4e00-\u9fa5]");
            var matches = reg.Matches(strValue);
            string result = string.Join("", matches);
            return result;
        }
    }
}
