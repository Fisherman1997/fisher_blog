import { Controller, Post, Body} from '@nestjs/common'
import { ArticleService } from './ArticleList.service'
import { Public } from '../../../common/public.docortor'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {ArticleAndRandomFindHomeParam, ArticleFindHomeParam} from "./model/ArticleList.param";
import {IdParam} from "../../../model/BaseParam";
import {PageRsult} from "../../../model/BaseRsult";
import {ArticleList} from "../../../db/entities/ArticleList";
import {ArticleListResult} from "./model/Article.Rsutl";


@ApiTags('blog/article')  // 用于给路由分组
@Controller('blog/article')
export class ArticleController {
    constructor(
        private articleService: ArticleService
    ) {}

    @Post('list')
    @Public()
    list (@Body() listBody: ArticleFindHomeParam) : Promise<PageRsult<ArticleList>> {
        return this.articleService.list(listBody)
    }

    @Post('findOne')
    @Public()
    findOne (@Body() findBody: IdParam): Promise<ArticleList> {
        return this.articleService.findOne(findBody)
    }

    @Post('findArticleAndRandomWrite')
    @Public()
    findArticleAndRandomWrite (@Body() findBody: ArticleAndRandomFindHomeParam): Promise<PageRsult<ArticleListResult>> {
        return this.articleService.findArticleAndRandomWrite(findBody)
    }
}