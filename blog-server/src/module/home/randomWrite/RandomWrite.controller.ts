import {Controller, Post, Body, HttpStatus} from '@nestjs/common'
import { RandomWriteService } from './RandomWrite.service'
import {ApiTags, ApiResponse, ApiBody} from '@nestjs/swagger';
import {IdParam, PageParam} from "../../../model/BaseParam";
import {RandomWrite} from "../../../db/entities/RandomWrite";
import {Public} from "../../../common/public.docortor";
import {PageRsult} from "../../../model/BaseRsult";


@ApiTags('blog/randomWrite')  // 用于给路由分组
@Controller('blog/randomWrite')
export class RandomWriteController {
    constructor(
        private randomWriteService: RandomWriteService
    ) {}


    @ApiBody({ type: PageParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED,type: Array<RandomWrite>, description: '成功'})
    @Post('list')
    @Public()
    list (@Body() listBody: PageParam) : Promise<PageRsult<RandomWrite>> {
        return this.randomWriteService.list(listBody)
    }

    @ApiBody({ type: IdParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Post('findOne')
    @Public()
    findOne (@Body() findBody: IdParam): Promise<RandomWrite> {
        return this.randomWriteService.findOne(findBody)
    }
}