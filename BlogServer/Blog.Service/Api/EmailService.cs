
using Blog.Model.Entity;
using Blog.Service.Api.Interface;
using Blog.Utils;
using MailKit.Net.Smtp;
using MimeKit;
using System.Web;
using System.Xml.Linq;

namespace Blog.Service.Api
{
    public class EmailService: IEmailService
    {

        public async Task SendEmailAsync(string? toEmail, CommentEnity enity, string RrticleUrl)
        {
            var toEmailBol = toEmail ?? GlobalContext.emailConfig!.TakeOverQq;
            var Email = GlobalContext.emailConfig!;
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Fisherman", Email.Email));
            message.To.Add(new MailboxAddress($"{toEmailBol}@qq.com", $"{toEmailBol}@qq.com"));
            message.Subject = "在Fisherman有人回复你";


            //var name = string.IsNullOrEmpty(toEmail) ? enity.ReviewerName : toEmail;
            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = $@"
                    <div style=""font:normal 12px arial;border:1px solid #e6e7e9;margin:0 10px 10px 10px;padding:12px;"">
                        <div>
                            <div style=""background: white;width: 95%; max-width: 600px;margin: auto auto; border-radius: 5px;border:orange 1px solid;-webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.12);box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.18);"">             
                                <div style=""padding: 5px 20px;"">
                                    <p style=""position: relative;color: white;float: left;z-index: 999;background: orange;padding: 5px 30px;margin: -25px auto 0 ;box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.30)"">Blog</p>        
                                    <p style=""font-size: 14px"">
                                        在网站Fisherman
                                        <span style=""font-size: 16px;"">
                                            「<span style=""text-decoration: none;color: orange "">{ enity.ReviewerName }</span> 」
                                        </span>
                                        回复了你
                                        <br>
                                     </p>
                                     <p style=""font-size: 14px;border: 1px solid rgba(0,0,0,.3);padding: 10px;"">
                                        {enity.Content}
                                    </p>
                                    <p style=""font-size: 14px;"">祝你生活美满，身体健康，萌萌哒</p>       
                                    <div style=""text-align: center;"">
                                        <p>
                                            <a href='{ChekUrl(RrticleUrl, enity.Id)}' style=""text-transform: uppercase;text-decoration: none;font-size: 14px;border: 2px solid #6c7575;color: #2f3333; padding: 10px; display: inline-block;margin: 10px auto 0; "" target=""_blank"" rel=""noopener"">点击链接</a>
                                        </p>        
                                    </div>
                                    <p style=""font-size: 12px;text-align: center;color: #999;"">
                                        本邮件为网站自动发出
                                        <br> 
                                        ©2021-2024 渔夫Fisherman
                                    </p>       
                                </div>
                            </div>
                        </div>
                    </div>
                "
            };
            message.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(Email.SmtpServer, Email.SmtpPort, Email.UseSsl);
                await client.AuthenticateAsync(Email.Email, Email.Password);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }
        private string ChekUrl(string url, int id) 
        {
            if (HasParameters(url))
            {
                return url + "&comment_" + id.ToString();
            }
            else if (url[url.Length - 1] == '/')
            {
                return url + "?comment_" + id.ToString();
            }
            else
            {
                return url + "/?comment_" + id.ToString();
            }
        }
        private bool HasParameters(string url)
        {
            try
            {
                Uri uri = new Uri(url);

                // 获取查询参数部分（包含问号）
                string query = uri.Query;

                // 如果没有查询部分或查询部分仅为问号
                if (string.IsNullOrEmpty(query) || query == "?")
                {
                    return false;
                }

                // 解析查询参数
                var parameters = HttpUtility.ParseQueryString(query);

                // 检查是否存在有效参数
                return parameters.Count > 0;
            }
            catch (UriFormatException)
            {
                // URL格式无效
                return false;
            }
        }
    }
}
