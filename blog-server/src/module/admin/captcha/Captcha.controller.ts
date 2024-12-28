import {Controller, Get, HttpStatus, Req, Res} from '@nestjs/common'
import {ApiTags, ApiResponse } from '@nestjs/swagger';
 import { Request, Response } from 'express';
import {CaptchaService} from "./Captcha.service";
import {Public, SkipResponseInterceptor} from "../../../common/public.docortor";

@ApiTags('Captcha')  // 用于给路由分组
@Controller('api/Captcha')
export class CaptchaController  {
    constructor( private captchaService: CaptchaService ) {}

    // 查询
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Get("GenerateCaptcha")
    @Public()
    @SkipResponseInterceptor()
    GenerateCaptcha(@Req() req: Request, @Res() res: Response) {
        res.setHeader('Content-Type', 'image/png');
        res.send(this.captchaService.Get(req))
    }
}