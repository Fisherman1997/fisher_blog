using Blog.Service.Api;
using Blog.Web.Attributes;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Blog.Web.Filter
{
    public class VisitTrackingFilter : IAsyncActionFilter
    {
        private readonly VisitStatService _visitService;

        public VisitTrackingFilter(VisitStatService visitService)
        {
            _visitService = visitService;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var actionDescriptor = context.ActionDescriptor as ControllerActionDescriptor;
            var hasAttribute = actionDescriptor!.MethodInfo.GetCustomAttributes(typeof(TrackVisitAttribute), true).Any() ||
                               actionDescriptor.ControllerTypeInfo.GetCustomAttributes(typeof(TrackVisitAttribute), true).Any();

            if (hasAttribute)
            {
                await _visitService.LogVisitAsync(context.HttpContext);
            }

            await next();
        }
    }

}
