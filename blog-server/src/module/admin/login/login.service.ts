import {ConflictException, Injectable, NotFoundException} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm' 
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import { Md5 } from 'ts-md5/dist/md5'
import { User } from '../../../db/entities/User'

import { MailerService } from '@nestjs-modules/mailer';
import {LoginRsult} from "./model/Login.Rsult";
import {SignInParam} from "./model/Login.param";

@Injectable() 
export class LoginService {
    constructor (
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService,
        private readonly mailerService: MailerService
    ) {}

    // 登录
    async signIn(body: SignInParam): Promise<LoginRsult> {
        const result = await this.userRepository.findOne({
            where: { code: body.code }
        })
        if (!result) throw new NotFoundException('查无此人')
        if (Md5.hashStr(body.password) !== result.password) throw new ConflictException('密码错误')
        if (result.status === 0) throw new ConflictException('该账号未审核启用，请联系管理员启用')
        if (!result.power || JSON.parse(result.power).length === 0) throw new ConflictException('账号无权限，请联系管理员分配权限')
        const userInfo: User = { ...result }
        userInfo.password = null
        userInfo.token = null
        const token = this.jwtService.sign(
          { code: result.code },
          { secret: process.env.JWT_SECRET, expiresIn: '15 days' }
        )
        result.token = token
        await this.userRepository.save(result)
        if (userInfo.portrait) userInfo.portrait = userInfo.portrait.length ? JSON.parse(userInfo.portrait) : null
        return {
            token,
            userInfo
        }
    }


    // 检验token返回数据
    async checkToken (token: string) : Promise<User> {
        const result = await this.userRepository.findOne({
            select: ['id', 'code', 'name', 'eMail', 'status', 'portrait'],
            where: { token: token }
        })
        if (result.portrait && result.portrait.length) result.portrait = JSON.parse(result.portrait)
        return result
    }
}