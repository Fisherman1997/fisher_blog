using Blog.Model.Entity;
using Blog.Model.Param;
using Blog.Service.Api.Interface;
using SqlSugar;

namespace Blog.Service.Api
{
    public class ClassificationService : IClassificationService
    {
        public ClassificationService(ISqlSugarClient client)
        {
            Db = client;
        }

        public ISqlSugarClient Db { get; }

        public async Task Insert(ClassInsertParam param)
        {
            var ex = await Db.Queryable<ClassificationEnity>().Where(it => it.Name == param.Name).FirstAsync();
            if (ex != null) throw new Exception("已存在相同的分类"); 
            var classElement = new ClassificationEnity
            {
                Name = param.Name,
            };
            await Db.Storageable(classElement).ExecuteCommandAsync();
        }

        public async Task Update(ClassUpdateParam param)
        {
            var ex = await Db.Queryable<ClassificationEnity>()
                .Where(it => it.Name == param.Name && it.Id != param.Id)
                .FirstAsync();
            if (ex != null) throw new Exception("已存在相同的分类");
            var classElement = await Db.Queryable<ClassificationEnity>()
                .Where(it => it.Id == param.Id)
                .FirstAsync();
            classElement.Name = param.Name;
            await Db.Storageable(classElement).ExecuteCommandAsync();
        }

        public async Task<List<ClassificationEnity>> List(ClassFindParam param)
        { 
            var list = await Db.Queryable<ClassificationEnity>()
                .WhereIF(!string.IsNullOrEmpty(param.Name), it => it.Name!.Contains(it.Name))
                .OrderBy(it => it.Id, OrderByType.Asc)
                .ToListAsync();
            return list;
        }

        public async Task<ClassificationEnity> FindOne(IDParam param)
        {
            var element = await Db.Queryable<ClassificationEnity>().Where(it => it.Id == param.Id).FirstAsync();
            if (element == null) throw new NullReferenceException("你查询的ID不存在");
            return element;
        }

        public async Task Delete(IDParam param)
        {
            await Db.Deleteable<ClassificationEnity>().In(it => it.Id,param.Id).ExecuteCommandAsync();
        }
    }
}
