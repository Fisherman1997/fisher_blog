using Markdig;
using Markdig.Renderers;
using Markdig.Renderers.Html;
using Markdig.Renderers.Html.Inlines;
using Markdig.Syntax;
using Markdig.Syntax.Inlines;

namespace Blog.Utils
{
    public class GetMarkdonwSwitchHTML
    {
        private class CustomHeadingRenderer : HtmlObjectRenderer<HeadingBlock>
        {
            protected override void Write(HtmlRenderer renderer, HeadingBlock Heading)
            {
                // 渲染 <hX> 标签的起始部分，其中 X 是标题的级别
                renderer.Write($"<h{Heading.Level} id=\"")
                    .Write(Heading.Inline!);



                // 渲染标题内容
                renderer.Write("\">").WriteLeafInline(Heading);

                // 渲染结束标签 </hX>
                renderer.Write($"</h{Heading.Level}>");
            }
        }

        private class CustomLinkRenderer : HtmlObjectRenderer<LinkInline>
        {
            protected override void Write(HtmlRenderer renderer, LinkInline link)
            {
                // 检查是否为正常链接（忽略图片链接）
                if (!link.IsImage)
                {
                    // 开始渲染 <a> 标签
                    renderer.Write("<a");

                    // 添加 href 属性
                    renderer.Write($" href=\"{link.Url}\"");

                    // 添加自定义属性（如在新标签页中打开）
                    renderer.Write(" target=\"_blank\" rel=\"noopener noreferrer\"");

                    // 检查并添加 title 属性（如果存在）
                    if (!string.IsNullOrEmpty(link.Title))
                    {
                        renderer.Write($" title=\"{link.Title}\"");
                    }

                    renderer.Write(">");

                    // 渲染链接文本内容
                    renderer.WriteChildren(link);

                    // 结束 <a> 标签
                    renderer.Write("</a>");
                }
                else
                {
                    // 默认处理图片链接
                    renderer.Write("<img");
                    renderer.Write($" src=\"{link.Url}\"");
                    if (!string.IsNullOrEmpty(link.Title))
                    {
                        renderer.Write($" title=\"{link.Title}\"");
                    }
                    renderer.Write(" />");
                }

            }
        }
        public static string GetToHtml(string markdown)
        {
            using (var writer = new StringWriter())
            {
                var pipeline = new MarkdownPipelineBuilder()
                    .UseAdvancedExtensions()
                    .Build();
                var renderer = new HtmlRenderer(writer);

                // 替换默认渲染器为自定义渲染器
                renderer.ObjectRenderers.Replace<HeadingRenderer>(new CustomHeadingRenderer());
                renderer.ObjectRenderers.Replace<LinkInlineRenderer>(new CustomLinkRenderer());

                // 解析 Markdown 文本
                var document = Markdig.Markdown.Parse(markdown, pipeline);

                // 使用渲染器处理文档
                renderer.Render(document);
                return writer.ToString();
            }
        }
    }
}
