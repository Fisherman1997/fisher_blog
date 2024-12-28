import {Controller, Post, Body, Delete, HttpStatus} from '@nestjs/common'
import { CustomService } from './Custom.service'
import {ApiTags, ApiResponse, ApiBody} from '@nestjs/swagger';
import {NameParam} from "../../../model/BaseParam";
import {Custom} from "../../../db/entities/Custom";
import {Public} from "../../../common/public.docortor";


@ApiTags('blog/custom')  // 用于给路由分组
@Controller('blog/custom')
export class CustomController {
    constructor(
        private customService: CustomService
    ) {}
    @ApiBody({ type: NameParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功',example: Custom})
    @Post('find')
    @Public()
    findOne (@Body() findBody: NameParam): Promise<Custom> {
        return this.customService.findOne(findBody)
    }
}