import {Controller, Post, Body, Delete, HttpStatus} from '@nestjs/common'
import { ArticleService } from './ArticleList.service'
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import {IdParam} from "../../../model/BaseParam";
import {ArticleFindParam, InsertArticleParam, UpdateArticleParam} from "./model/ArticleList.param";
import {ArticleFindResult} from "./model/ArticleList.Rsult";
import {PageRsult} from "../../../model/BaseRsult";


@ApiTags('article')  // 用于给路由分组
@Controller('api/article')
export class ArticleController {
    constructor(
        private articleService: ArticleService
    ) {}


    // @ApiBody({})
    @ApiBody({ type: InsertArticleParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功', example: InsertArticleParam})
    @Post('insert')
    insert (@Body() insertBody: InsertArticleParam) : Promise<void> {
        return this.articleService.insert(insertBody)
    }

    @ApiBody({ type: UpdateArticleParam })
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Post('update')
    update (@Body() updateBody: UpdateArticleParam) : Promise<void> {
        return this.articleService.update(updateBody)
    }

    @ApiBody({ type: ArticleFindParam })
    @ApiResponse({status: HttpStatus.CREATED, type: Array<ArticleFindResult>, description: '成功'})
    @Post('list')
    list (@Body() listBody: ArticleFindParam) : Promise<PageRsult<ArticleFindResult>> {
        return this.articleService.list(listBody)
    }

    @ApiBody({ type: IdParam })
    @ApiResponse({status: HttpStatus.CREATED, type: ArticleFindResult, description: '成功'})
    @Post('findOne')
    findOne (@Body() findBody: IdParam): Promise<ArticleFindResult> {
        return this.articleService.findOne(findBody)
    }

    @ApiBody({ type: IdParam })
    @Delete('delete')
    delete (@Body() deleteBody: IdParam): Promise<void> {
        return this.articleService.delete(deleteBody)
    }
}