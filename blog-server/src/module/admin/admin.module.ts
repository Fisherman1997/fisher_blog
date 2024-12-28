import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtAuthGuard } from '../../authGuard/jwt.auth.guard'
import { User as EntitiesUser } from '../../db/entities/User'
import { ArticleList } from './articleList/ArticleList.module'
import { RandomWrite } from './randomWrite/RandomWrite.module'
import { RoutingConfigure } from './routingConfigure/routingConfigure.module'
import { User } from './user/User.module'
import { Classification } from './classification/Classification.module'
import { FileUpload } from './file/file.module'
import { Login } from './login/login.module'
import { Comment } from './comment/Comment.module'
import { Links } from './links/Links.module'
import { Custom } from './custom/Custom.module'
import {Captcha} from "./captcha/Captcha.module";



@Module({
  imports: [
    TypeOrmModule.forFeature([EntitiesUser]),
    ArticleList,
    RandomWrite,
    RoutingConfigure,
    User,
    Classification,
    Login,
    FileUpload,
    Comment,
    Links,
    Custom,
    Captcha
  ],
  controllers: [],
  providers: [  // 全局守卫，token验证拦截
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    JwtService
  ],
})
export class AdminModuleMuster {}