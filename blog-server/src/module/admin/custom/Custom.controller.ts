import {Controller, Post, Body, Delete, HttpStatus} from '@nestjs/common'
import { CustomService } from './Custom.service'
import {ApiTags, ApiResponse, ApiBody} from '@nestjs/swagger';
import {CustomFindParam, CustomInsertParam, CustomUpdateParam} from "./model/Custom.param";
import {IdParam} from "../../../model/BaseParam";
import {Custom} from "../../../db/entities/Custom";
import {PageRsult} from "../../../model/BaseRsult";


@ApiTags('custom')  // 用于给路由分组
@Controller('api/custom')
export class CustomController {
    constructor(
        private customService: CustomService
    ) {}

    @ApiBody({ type: CustomInsertParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Post('insert')
    insert (@Body() insertBody: CustomInsertParam) : Promise<void> {
        return this.customService.insert(insertBody)
    }

    @ApiBody({ type: CustomUpdateParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Post('update')
    update (@Body() updateBody: CustomUpdateParam) : Promise<void> {
        return this.customService.update(updateBody)
    }


    @ApiBody({ type: CustomFindParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED,type: Array<Custom>, description: '成功'})
    @Post('list')
    list (@Body() listBody: CustomFindParam) : Promise<PageRsult<Custom>> {
        return this.customService.list(listBody)
    }

    @ApiBody({ type: IdParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED,type: Custom, description: '成功'})
    @Post('findOne')
    findOne (@Body() findBody: IdParam): Promise<Custom> {
        return this.customService.findOne(findBody)
    }

    @ApiBody({ type: IdParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Delete('delete')
    delete (@Body() deleteBody: IdParam): Promise<void> {
        return this.customService.delete(deleteBody)
    }
}