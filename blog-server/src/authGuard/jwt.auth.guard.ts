import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { InjectRepository } from '@nestjs/typeorm'
// import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
// import { User } from '../db/entities/User'

@Injectable()
export class JwtAuthGuard {
    constructor(
        // @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService,
        private reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext) : Promise<boolean>{
        // 检测是否可以直接通行
        const isPublic = this.reflector.get<string[]>('isPublic', context.getHandler());
        if (isPublic) return true

        // 从请求头获取客户端
        const tokenStr = context.switchToHttp().getRequest().header('token')
        // console.log(tokenStr)
        if (!tokenStr) throw new UnauthorizedException('Invalid token');

        // const user = await this.userRepository.find({
        //     where: {token: tokenStr}
        // })
        // if (!user.length) throw new UnauthorizedException('Invalid token');

        try{
            const result = this.jwtService.verify(tokenStr,{ secret: process.env.JWT_SECRET })
            if (!result) {
                // noinspection ExceptionCaughtLocallyJS
                throw new UnauthorizedException('Invalid token');  // 如果 JWT 验证失败，返回 401
            }
        } catch(err){
            console.error(err.message);
            throw new UnauthorizedException('Invalid token');  // 捕获异常并返回 401
        }
        return true
    }
}
