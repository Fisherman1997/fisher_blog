import {Controller, Post, Body, HttpStatus} from '@nestjs/common'
import { CommentService } from './Comment.service'
import {
    CommentInsertParam,
    CommentHomeFindParam
} from './model/comment.param'
import { Public } from '../../../common/public.docortor'
import {ApiTags, ApiOperation, ApiResponse, ApiBody} from '@nestjs/swagger';
import {PageRsult} from "../../../model/BaseRsult";
import {CommentRsutl} from "./model/Comment.Rsutl";


@ApiTags('blog/comment')  // 用于给路由分组
@Controller('blog/comment')
export class CommentController {
    constructor(
        private commentService: CommentService
    ) {}


    @ApiBody({ type: CommentInsertParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Post('insert')
    @Public()
    insert (@Body() insertBody: CommentInsertParam) :Promise<void> {
        return this.commentService.insert(insertBody)
    }


    @ApiBody({ type: CommentHomeFindParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, type: Array<CommentRsutl>, description: '成功'})
    @Post('list')
    @Public()
    list (@Body() listBody: CommentHomeFindParam) :Promise<PageRsult<CommentRsutl>> {
        return this.commentService.findAll(listBody)
    }
}