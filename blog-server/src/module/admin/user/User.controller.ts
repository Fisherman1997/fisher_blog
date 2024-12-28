import {Controller, Post, Delete, Body, HttpStatus} from '@nestjs/common'
import { UserService } from './User.service'
import {ApiTags, ApiOperation, ApiResponse, ApiBody} from '@nestjs/swagger';
import {
    UserFindParam,
    UserInsertParam,
    UserUpdateParam,
    UserUpdatePasswordParam,
    UserUpdatePowerParam
} from "./model/User.param";
import {IdParam} from "../../../model/BaseParam";
import {PageRsult} from "../../../model/BaseRsult";
import {User} from "../../../db/entities/User";


@ApiTags('user')  // 用于给路由分组
@Controller('api/user')
export class UserController {
    constructor (private readonly userService: UserService) {}

    @ApiBody({ type: UserInsertParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Post('insert')
    insert (@Body() insetBody: UserInsertParam) :Promise<void> {
        return this.userService.insert(insetBody)
    }

    @ApiBody({ type: UserFindParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, type: Array<User>, description: '成功'})
    @Post('list')
    list (@Body() listBody: UserFindParam): Promise<PageRsult<User>> {
        return this.userService.list(listBody)
    }

    @ApiBody({ type: UserUpdateParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Post('update')
    update (@Body() updateBody: UserUpdateParam): Promise<void> {
        return this.userService.update(updateBody)
    }

    @ApiBody({ type: UserUpdatePasswordParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Post('updatePassword')
    updatePassword (@Body() pwBody: UserUpdatePasswordParam): Promise<void> {
        return this.userService.updatePassword(pwBody)
    }

    @ApiBody({ type: UserUpdatePowerParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Post('updateUserPower')
    updateUserPower (@Body() body: UserUpdatePowerParam): Promise<void> {
        return this.userService.updateUserPower(body)
    }

    @ApiBody({ type: IdParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, type: Array<number>, description: '成功'})
    @Post('getUserPower')
    getUserPower (@Body() getBody: IdParam): Promise<Array<number>> {
        return this.userService.getUserPower(getBody)
    }

    @ApiBody({ type: IdParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Delete('delete')
    delete (@Body() deleteBody: IdParam): Promise<void> {
        return this.userService.delete(deleteBody)
    }
}