import {Controller, Post, Delete, Body, HttpStatus} from '@nestjs/common'
import { RoutingConfigureService } from './routingConfigure.service'
import {
    RoutingConfigureFindParam,
    RoutingConfigureInsertParam,
    RoutingConfigureUpdateParam
} from './model/routingConfigure.param'
import {ApiTags, ApiResponse, ApiBody} from '@nestjs/swagger';
import {IdParam} from "../../../model/BaseParam";
import { RoutingConfigureFindRsutl} from "./model/RoutingConfigure.Rsult";


@ApiTags('routingConfigure')  // 用于给路由分组
@Controller('api/routingConfigure')
export class RoutingConfigureController {
    constructor(
        private routingService: RoutingConfigureService
    ) {}

    @ApiBody({ type: RoutingConfigureInsertParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Post('insert')
    insert (@Body() insertBody: RoutingConfigureInsertParam ): Promise<void> {
        return this.routingService.insert(insertBody)
    }

    @ApiBody({ type: RoutingConfigureUpdateParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Post('update')
    update (@Body() updateBody: RoutingConfigureUpdateParam ): Promise<void> {
        return this.routingService.update(updateBody)
    }

    @ApiBody({ type: RoutingConfigureFindParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, type: Array<RoutingConfigureFindRsutl>, description: '成功'})
    @Post('list')
    list (@Body() listBody: RoutingConfigureFindParam ): Promise<Array<RoutingConfigureFindRsutl>> {
        return this.routingService.list(listBody)
    }

    @ApiBody({ type: IdParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, type: Array<RoutingConfigureFindRsutl>, description: '成功'})
    @Post('getPowerRuoter')
    getPowerRouter (@Body() powerBody: IdParam ): Promise<Array<RoutingConfigureFindRsutl>> {
        return this.routingService.getPowerRouter(powerBody)
    }

    @ApiBody({ type: RoutingConfigureInsertParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Delete('delete')
    delete (@Body() deleteBody: IdParam ): Promise<void> {
        return this.routingService.delete(deleteBody)
    }
}