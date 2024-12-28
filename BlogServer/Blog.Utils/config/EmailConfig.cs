namespace Blog.Utils.config
{
    public class EmailConfig
    {
        public required string Email {  get; set; }
        public required string Password { get; set; }
        public required string SmtpServer { get; set; }
        public required int SmtpPort { get; set; }
        public required bool UseSsl { get; set; }
        public required string TakeOverQq { get; set; }
    }
}
