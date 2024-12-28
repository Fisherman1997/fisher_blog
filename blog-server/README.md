## 博客服务nestjs版

##### 安装依赖

```
npm install
//或 yarn install
```

##### 开发环境运行
```
npm run start:dev
```

##### 生产环境
```
有两种，打包依赖的不打包依赖的
常规的
打包：npm build 
运行：npm start

带着依赖一起打包的：这个方式的直接将打包好的文件上传服务器，用node就能够直接运行
打包：npm run build:pkg 
运行：node dist_bundle/index
```

##### 项目依赖说明

|      依赖       |          说明          |
| :-------------: | :--------------------: |
|     nestjs      | 项目基于nestjs框架开发 |
|     mysql2      |       链接数据库       |
|     typeorm     |       管理数据库       |
|      axios      |        请求工具        |
|     dotenv      |      管理全局配置      |
|     canvas      |    生成检验码的图片    |
|   markdown-it   |      markdown转化      |
| express-session |      管理session       |

##### 一些配配置说明.env

|      KEY       |        说明         |
| :------------: |:-----------------:|
|    NODE_ENV    |       环境配置        |
|  WEBSITE_NAME  |        名称         |
|      PORT      |      服务启动端口       |
|   MYSQL_HOST   |       数据库主机       |
|   MYSQL_PORT   |       数据库端口       |
| MYSQL_USERNAME |      数据库用户名       |
| MYSQL_PASSWORD |       数据库密码       |
| MYSQL_DATABASE |       数据库名称       |
|   JWT_SECRET   |    Token的加密Key    |
|   EMAIL_HOST   | 邮箱主机（qq的，具体自己去配置） |
|   EMAIL_PORT   |        端口         |
| EMAIL_USERNAME |       邮箱地址        |
| EMAIL_PASSWORD |       邮箱密码        |
| TAKEOVER_QQ |     评论默认接收邮箱      |
| SESSION_SECRET |  session_secret   |

