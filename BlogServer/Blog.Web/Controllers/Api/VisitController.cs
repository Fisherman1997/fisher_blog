using Blog.Model.Rsult;
using Blog.Service.Api.Interface;
using Blog.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Web.Controllers.Api
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class VisitController : ControllerBase
    {
        public VisitController(IVisitService visitService)
        {
            VisitService = visitService;
        }

        public IVisitService VisitService { get; }

        [HttpGet]
        public async Task<ResultStruct<List<VisitRsult>>> Get()
        {
            return await ResultFun.AsyncReturn(VisitService.GetVisit);
        }
    }
}
