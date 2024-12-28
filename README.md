## 我的博客

#### 目录介绍：

**blog-admin**：后台管理（前端），vue + element-puls + pinia

**blog-home**：网站主页，react + nextjs + animate.css

**BlogServer**：后端服务，asp.net core + mysql + SqlSugarCore

**blog-server**：后端服务，nestjs + mysql + typeorm

**sql**：blogdb.sql项目基础数据，请自行导入，仅mysql

[^注意！]: 请在BlogServer与blog-server之间二选一

具体的事项可以到项目内的**README**中去查看

##### 接下来是一些部署的说明

```
使用nginx来代理分发资源

blog-admin
  	打包后，nginx中配置一个服务比如是8000端口的服务 直接链接到index
  
blog-home
  	打包后，nginx中配置一个服务比如是3000端口的服务 直接链接到index
  
blog-server或BlogServer：
	运行默认为5000端口

nginx配置：
	默认路径代理的3000端口
	/admin代理到8000端口
	^(api|blog)代理到5000端口 ： api：管理接口，blog：主页接口


静态资源进行单独处理
# 防盗链配置，仅针对静态资源
location ~* \.(jpg|jpeg|png|gif|css|js|woff|woff2|svg|ttf|eot)$ {
    valid_referers none blocked 域名 或主机;  # 允许指定的 Referer
    if ($invalid_referer) {
    	return 403;  # 禁止外部站点访问静态资源
    }

    # 直接转发到子服务，而不是通过 rewrite
    if ($request_uri ~ ^/imgS) {
        proxy_pass 后端服务;
        break;
    }

    if ($request_uri ~ ^/admin) {
        proxy_pass 后台服务;
        break;
    }

    # 默认处理逻辑
    proxy_pass 主页服务;
}
```

