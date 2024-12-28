using Blog.Model.Entity;

namespace Blog.Service.Api.Interface
{
    public interface IEmailService
    {
        Task SendEmailAsync(string? toEmail, CommentEnity enity, string RrticleUrl);
    }
}
