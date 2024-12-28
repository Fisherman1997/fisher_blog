import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 使用@nestjs/typeorm链接mysql
import { EntitiesArray } from './db/db'; // 表的实体结构导入
import { MailerModule } from "@nestjs-modules/mailer";
import { AdminModuleMuster } from './module/admin/admin.module';
import { HomeModuleMuster } from './module/home/home.module';


@Module({
  imports: [
    AdminModuleMuster,
    HomeModuleMuster,
    TypeOrmModule.forRoot({ // 连接数据库
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [...EntitiesArray],
      synchronize: true
    }),
    MailerModule.forRoot({ // 导入配置邮箱
      transport: {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        ignoreTLS: true,
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      }
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
