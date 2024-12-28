import {Controller, Post, Body, Delete, HttpStatus} from '@nestjs/common'
import { LinksService } from './Links.service'
import {LinksInsertParam, LinksUpdateParam} from "./model/links.param";
import {ApiTags, ApiResponse, ApiBody} from '@nestjs/swagger';
import {IdParam, PageParam} from "../../../model/BaseParam";
import {PageRsult} from "../../../model/BaseRsult";
import {Links} from "../../../db/entities/Links";


@ApiTags('links')  // 用于给路由分组
@Controller('api/links')
export class LinksController {
    constructor(
        private linksService: LinksService
    ) {}

    @ApiBody({ type: LinksInsertParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED,type: Array<string>, description: '成功'})
    @Post('insert')
    insert (@Body() insertBody: LinksInsertParam) : Promise<void> {
        return this.linksService.insert(insertBody)
    }

    @ApiBody({ type: LinksUpdateParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Post('update')
    update (@Body() updateBody: LinksUpdateParam) : Promise<void> {
        return this.linksService.update(updateBody)
    }


    @ApiBody({ type: PageParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED,type: Array<Links>, description: '成功'})
    @Post('list')
    list (@Body() listBody: PageParam) : Promise<PageRsult<Links>> {
        return this.linksService.list(listBody)
    }

    @ApiBody({ type: IdParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED,description: '成功'})
    @Delete('delete')
    delete (@Body() deleteBody: IdParam): Promise<void> {
        return this.linksService.delete(deleteBody)
    }
}