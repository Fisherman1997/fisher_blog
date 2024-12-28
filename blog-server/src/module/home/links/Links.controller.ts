import {Controller, Get, HttpStatus} from '@nestjs/common'
import { LinksService } from './Links.service'
import {ApiTags, ApiResponse} from '@nestjs/swagger';
import {Links} from "../../../db/entities/Links";
import {Public} from "../../../common/public.docortor";


@ApiTags('blog/links')  // 用于给路由分组
@Controller('blog/links')
export class LinksController {
    constructor(
        private linksService: LinksService
    ) {}


    @ApiResponse({status: HttpStatus.CREATED,type: Array<Links>, description: '成功'})
    @Get('list')
    @Public()
    list() : Promise<Array<Links>> {
        return this.linksService.list()
    }
}