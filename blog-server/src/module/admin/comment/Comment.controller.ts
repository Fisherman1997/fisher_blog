import {Controller, Post, Body, Delete, HttpStatus} from '@nestjs/common'
import { CommentService } from './Comment.service'
import { CommentFindParam, CommentUpdateParam} from './model/comment.param'
import {ApiTags, ApiResponse, ApiBody} from '@nestjs/swagger';
import {IdParam} from "../../../model/BaseParam";
import {PageRsult} from "../../../model/BaseRsult";
import {Comment} from "../../../db/entities/Comment";


@ApiTags('comment')  // 用于给路由分组
@Controller('api/comment')
export class CommentController {
    constructor(
        private commentService: CommentService
    ) {}

    @ApiBody({ type: CommentFindParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, type: Array<Comment>, description: '成功'})
    @Post('list')
    list (@Body() listBody: CommentFindParam) :Promise<PageRsult<Comment>> {
        return this.commentService.findAll(listBody)
    }

    @ApiBody({ type: CommentUpdateParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Post('update')
    update (@Body() updateBody: CommentUpdateParam) :Promise<void> {
        return this.commentService.update(updateBody)
    }

    @ApiBody({ type: IdParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Delete('delete')
    delete (@Body() deleteBody: IdParam): Promise<void> {
        return this.commentService.delete(deleteBody)
    }
}