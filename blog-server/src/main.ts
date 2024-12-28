import 'dotenv/config';
import {NestFactory, Reflector} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {NestExpressApplication} from '@nestjs/platform-express';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ResponseInterceptor} from "./Interceptor/ResponseInterceptor"
import * as session from 'express-session';
import {join} from 'path';
import * as process from "node:process";

async function bootstrap(): Promise<void>   {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // app.useStaticAssets(join(__dirname, '..', 'public'), {
    //     prefix: '/api',
    // });
    // app.use(logger);

    // 配置session
    app.use(
        session({
            secret: process.env.SESSION_SECRET, // 设置 session secret
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true, // 设置为 true，防止 JavaScript 访问 Cookie
                secure: false,  // 在 HTTPS 环境下设置为 true
                maxAge: 1000 * 60, // 会话有效时间（30 秒）
            },
        }),
    );


    app.useGlobalPipes(new ValidationPipe());  // 启用全局验证管道
    app.useGlobalInterceptors(new ResponseInterceptor(app.get(Reflector)));

    const isDev = process.env.NODE_ENV !== 'production';
    if (isDev) {
        // 开发环境下启用跨域，方便调试
        app.enableCors({
            origin: 'http://localhost:3000', // 允许的源，可以使用数组配置多个源
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的方法
            allowedHeaders: 'Content-Type, Accept', // 允许的请求头
            credentials: true, // 允许携带凭证（如 Cookies）
        });
        // 开启api文档
        const options = new DocumentBuilder()
            .setTitle('NestJS API')
            .setDescription('The API description')
            .setVersion('0.0.1')
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('apiDocument', app, document);
    }

    app.useStaticAssets(join(__dirname, '..', 'public'));
    await app.listen(process.env.PORT);
    // process.env
}
bootstrap()
    .then(() => {
        console.info(`start_href: http://loaclhost:${process.env.PORT}`)
    });
