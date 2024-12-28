using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Utils.config
{
    public class SystemConfig
    {
        public bool Demo;// 是否是演示模式

        public required string DbType {  get; set; }

        public required string DefaultConnection {  get; set; }

        public required int DBCommandTimeout { get; set; }

        public required string DBBackup { get; set; }
        public required string CacheProvider { get; set; }
        public required string RedisConnectionString { get; set; }
        public required string DNTCaptchaKey { get; set; }
    }
}
