using Blog.Model.Entity;
using Blog.Service.Home.Interface;
using Blog.Utils;
using Blog.Web.Attributes;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Web.Controllers.Home
{
    [Route("blog/links")]
    [ApiController]
    [TrackVisit]  // 整个控制器都会被统计
    public class LinksController : ControllerBase 
    {
        public LinksController(ILinksHome linksHome)
        {
            LinksHome = linksHome;
        }

        public ILinksHome LinksHome { get; }

        [HttpGet("list")]
        public async Task<ResultStruct<List<LinksEnity>>> List()
        {
            return await ResultFun.AsyncReturn(LinksHome.List);
        }

    }
}
