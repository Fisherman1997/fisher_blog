import { Module } from '@nestjs/common';
import {CaptchaController} from "./Captcha.controller";
import {CaptchaService} from "./Captcha.service";

@Module({
    imports: [],
    controllers: [CaptchaController],
    providers: [CaptchaService],
})
export class Captcha {}