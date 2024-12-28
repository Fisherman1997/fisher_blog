import { Module } from '@nestjs/common';
import { Comment } from './comment/Comment.module'
import { ArticleList } from './articleList/ArticleList.module'
import { Classification } from "./classification/Classification.module";
import { Custom } from "./custom/Custom.module";
import { Links } from "./links/Links.module";
import { RandomWrite } from "./randomWrite/RandomWrite.module";


@Module({
    imports: [Comment, ArticleList, Classification, Custom, Links, RandomWrite],
    controllers: [],
    providers: [],
})
export class HomeModuleMuster {}