import {Controller, Post, Body, HttpStatus, Req, NotFoundException, ConflictException} from '@nestjs/common'
import { LoginService } from './login.service'
import {ChankTokenParam, SignInParam} from './model/Login.param'
import { Public } from '../../../common/public.docortor'
import {ApiTags, ApiResponse, ApiBody} from '@nestjs/swagger';
import {LoginRsult} from "./model/Login.Rsult";
import { Request } from "express"
import {User} from "../../../db/entities/User";


@ApiTags('login')  // 用于给路由分组
@Controller('api/login')
export class LoginController {
    constructor( private loginService: LoginService ) {}

    @ApiBody({ type: SignInParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED,type: LoginRsult, description: '成功'})
    @Post('signIn')
    @Public() // 不做jwt验证拦截，直接通行
    signIn(@Body() signBody: SignInParam, @Req() req: Request): Promise<LoginRsult>{
        if (!req.session["captcha"]) throw new NotFoundException("验证你已过期")
        if (req.session["captcha"].toLowerCase() !== signBody.captcha.toLowerCase()) {
            throw new ConflictException("验证码错误")
        }
        return this.loginService.signIn(signBody)
    }


    @ApiBody({ type: ChankTokenParam })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED,type: User, description: '成功'})
    @Post('checkToken')
    checkToken (@Body() body: ChankTokenParam): Promise<User> {
        return this.loginService.checkToken(body.token)
    }
}