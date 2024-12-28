import {Controller, Post, Delete, Body, HttpStatus} from '@nestjs/common'
import { ClassificationService } from './Classification.service'
import {ApiTags, ApiOperation, ApiResponse, ApiBody} from '@nestjs/swagger';
import {IdParam, NameAndIdParam, NameParam} from "../../../model/BaseParam";
import {Classification} from "../../../db/entities/Classification";
import {findClassDto} from "./model/classification.param";


@ApiTags('class')  // 用于给路由分组
@Controller('api/class')
export class ClassificationController {
    constructor( private classService: ClassificationService ) {}

    // 查询
    @ApiBody({ type: findClassDto })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Post('list')
    list(@Body() listBody: findClassDto): Promise<Array<Classification>> {
        return this.classService.list(listBody)
    }
    // 新增
    @ApiBody({ type: NameParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Post('insert')
    insert(@Body() updateBody: NameParam): Promise<void> {
        return this.classService.insert(updateBody)
    }

    // 修改
    @ApiBody({ type: NameAndIdParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Post('update')
    async update(@Body() updateBody: NameAndIdParam): Promise<void> {
        return this.classService.update(updateBody)
    }

    // 删除
    @ApiBody({ type: IdParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Delete('delete')
    delete(@Body() deleteBody: IdParam): Promise<void> {
        return this.classService.delete(deleteBody)
    }


    // 单项查询
    @ApiBody({ type: IdParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Post('findOne')
    findOne(@Body() findBody: IdParam): Promise<Classification> {
        return this.classService.findOne(findBody)
    }
}