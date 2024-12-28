import {Controller, Post, Body, Delete, ValidationPipe, Headers, HttpStatus} from '@nestjs/common'
import { RandomWriteService } from './RandomWrite.service'
import {
    RandomWriteFindParam,
    RandomWriteInsertParam,
    RandomWriteUpdateParam
} from "./model/RandomWrite.param";
import {ApiTags, ApiResponse, ApiBody} from '@nestjs/swagger';
import {IdParam} from "../../../model/BaseParam";
import {PageRsult} from "../../../model/BaseRsult";
import {RandomWrite} from "../../../db/entities/RandomWrite";


@ApiTags('randomWrite')  // 用于给路由分组
@Controller('api/randomWrite')
export class RandomWriteController {
    constructor(
        private randomWriteService: RandomWriteService
    ) {}

    @ApiBody({ type: RandomWriteInsertParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Post('insert')
    insert (@Body() insertBody: RandomWriteInsertParam) : Promise<void> {
        return this.randomWriteService.insert(insertBody)
    }

    @ApiBody({ type: RandomWriteUpdateParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Post('update')
    update (@Body() updateBody: RandomWriteUpdateParam) : Promise<void> {
        return this.randomWriteService.update(updateBody)
    }


    @ApiBody({ type: RandomWriteFindParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED,type: Array<RandomWrite>, description: '成功'})
    @Post('list')
    list (@Body() listBody: RandomWriteFindParam) : Promise<PageRsult<RandomWrite>> {
        return this.randomWriteService.list(listBody)
    }

    @ApiBody({ type: IdParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Post('findOne')
    findOne (@Body() findBody: IdParam): Promise<RandomWrite> {
        return this.randomWriteService.findOne(findBody)
    }

    @ApiBody({ type: IdParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Delete('delete')
    delete (@Body() deleteBody: IdParam): Promise<void> {
        return this.randomWriteService.delete(deleteBody)
    }
}