## 博客后台管理 vue + vite + ts

##### 安装依赖

```
npm install
//或 yarn install
```

##### 开发环境运行

```
npm run dev
```

##### 打包

```
npm run build
```

##### 项目依赖说明

|    依赖     |       说明        |
| :---------: | :---------------: |
|    vue3     | 本项目基于vue开发 |
| elemen-puls |     主要UI库      |
|   echarts   |    统计图形库     |
|    pinia    |  全局的状态管理   |
|    axios    |     请求工具      |

##### **一些配配置说明.env**

|           KEY            |                说明                 |
| :----------------------: | :---------------------------------: |
|         NODE_ENV         | 环境配置(production or development) |
|   VUE_APP_MASTER_TITLE   |           页面的标题后缀            |
|     VUE_APP_CAPTCHA      |             验证码链接              |
|     VUE_APP_BASE_URL     |              接口前缀               |
|   VUE_APP_HTTP_TIMEOUT   |            请求超时时间             |
| VUE_APP_LOCALSTORAGE_KEY |          没啥用随便填一点           |
