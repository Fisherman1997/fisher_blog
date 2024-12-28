
using Blog.Model.Entity;
using Blog.Model.Param;
using Blog.Model.Rsult;
using Blog.Service.Api.Interface;
using Newtonsoft.Json;
using SqlSugar;

namespace Blog.Service.Api
{
    public class RandomWriteService: IRandomWriteService
    {
        public RandomWriteService(ISqlSugarClient client, IFileService fileService)
        {
            Db = client;
            FileService = fileService;
        }

        public ISqlSugarClient Db { get; }
        public IFileService FileService { get; }

        public async Task Insert(RandomWriteInsertParam param)
        {
            //var user = await Db.Queryable<UserEnity>()
            //    .Where(it => it.Id == param.CreateUserId)
            //    .FirstAsync();
            var randomWrite = new RandomWriteEnity
            {   
                Clicks = 0,
                CreateDate = DateTime.Now,
                CreateUserId = param.CreateUserId,
                Content = param.Content,
                Cover_list = param.Cover_list != null ? JsonConvert.SerializeObject(param.Cover_list) : null
            };
            await Db.Storageable(randomWrite).ExecuteCommandAsync();
        }

        public async Task Update(RandomWriteUpdateParam param)
        {
            var randomWrite = await Db.Queryable<RandomWriteEnity>()
                .Where(x => x.Id == param.Id)
                .FirstAsync();
            randomWrite.Content = param.Content;
            randomWrite.Cover_list = param.Cover_list != null ? JsonConvert.SerializeObject(param.Cover_list) : null;
            randomWrite.UpdateTime = DateTime.Now;
            await Db.Storageable(randomWrite).ExecuteCommandAsync();
        }

        public async Task<PageResult<RandomWriteFindRsult>> List(RandomWriteFindParam param)
        {
            RefAsync<int> total = 0;
            var list = await Db.Queryable<RandomWriteEnity>()
                .WhereIF(!string.IsNullOrEmpty(param.Content), it => it.Content!.Contains(param.Content!))
                .OrderBy(it => it.CreateDate, OrderByType.Desc)
                .ToPageListAsync(param.Page, param.PageNum, total);
            return new PageResult<RandomWriteFindRsult>
            {
                List = list.Select(x => new RandomWriteFindRsult(x)).ToList(),
                Total = total
            };
        }

        public async Task<RandomWriteFindRsult> FindOne(IDParam param)
        {
            var randomWrite = await Db.Queryable<RandomWriteFindRsult>().Where(it => it.Id == param.Id).FirstAsync();
            return new RandomWriteFindRsult(randomWrite);
        }

        public async Task Delete(IDParam param)
        {
            var randomWrite = await Db.Queryable<RandomWriteEnity>().Where(it => it.Id == param.Id).FirstAsync();
            //Console.WriteLine(randomWrite.Cover_list);
            //Console.WriteLine(randomWrite.Cover_list != null);
            if (randomWrite.Cover_list != null)
            {
                //Console.WriteLine(randomWrite.Cover_list);
                var Cover_list = JsonConvert.DeserializeObject<List<string>>(randomWrite.Cover_list);
                if (Cover_list!.Count != 0) FileService.ImgsRemove(Cover_list);
            }
            await Db.Deleteable<RandomWriteEnity>().In(it => it.Id,param.Id).ExecuteCommandAsync()  ;
        }
    }
}
