import {Controller, HttpStatus, Get} from '@nestjs/common'
import { ClassificationService } from './Classification.service'
import {ApiTags, ApiResponse} from '@nestjs/swagger';
import {Classification} from "../../../db/entities/Classification";
import {Public} from "../../../common/public.docortor";


@ApiTags('blog/class') // 用于给路由分组
@Controller('blog/class')
export class ClassificationController {
    constructor( private classService: ClassificationService ) {}

    // 查询
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Get('list')
    @Public()
    list(): Promise<Array<Classification>> {
        return this.classService.list()
    }
}