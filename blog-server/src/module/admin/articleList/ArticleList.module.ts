import { Module } from '@nestjs/common';
import  { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleController } from './ArticleList.controller'
import { ArticleService } from './ArticleList.service'
import { FileService } from '../file/file.service'
import { ArticleList as EArticleList } from '../../../db/entities/ArticleList'
import { User } from '../../../db/entities/User'

@Module({
  imports: [TypeOrmModule.forFeature([EArticleList, User])],
  controllers: [ArticleController],
  providers: [ArticleService, FileService],
})
export class ArticleList {}