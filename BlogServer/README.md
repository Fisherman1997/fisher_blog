## 博客服务Asp.net core版

##### 运行

```
这个没啥好说的，打开vs一切就会自动就绪，就是这么简单
```



##### 项目依赖说明

|     依赖     |        说明        |
| :----------: | :----------------: |
|   Scrutor    |  批量注册依赖注入  |
|  SixLabors   | 生成图片（验证码） |
| SqlSugarCore |     管理数据库     |
|   Markdig    |    markdown转化    |
|   MailKit    |      邮箱发送      |

##### 一些配配置说明appsettings.json

```json
// 一目了然，应该没人看不到吧？ 

"Jwt": {
    "Key": "your of Key",
    "Issuer": "your of Issuer",
    "Audience": "your of Audience"
  },
  "SystemConfig": {
    "DbType": "MYSQL",
    "DefaultConnection": "server=localhost;user=root;password=123456;database=blogdb;charset=utf8mb4;",
    "DBCommandTimeout": 180, // 数据库超时时间，单位秒
    "DBBackup": "", // 数据库备份路径

    "CacheProvider": "Redis", // 缓存使用方式 Memory Redis
    "RedisConnectionString": "127.0.0.1:6379",
    "DNTCaptchaKey": "your of key"
  },
  "Email": {
    "Email": "your of Email",
    "Password": "your of Password",
    "SmtpServer": "your of SmtpServer",
    "SmtpPort": 465,
    "UseSsl": true,
    "TakeOverQq": "your of Email" // 默认接收的qq
  },
  "wwwrooturl": ""
```

