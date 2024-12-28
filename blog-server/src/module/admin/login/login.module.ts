import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { User as EntitiesUser } from '../../../db/entities/User'
import { LoginController } from './login.controller'
import { LoginService } from './login.service'

@Module({
    imports: [ 
        TypeOrmModule.forFeature([EntitiesUser])
    ],
    controllers: [LoginController],
    providers: [LoginService,JwtService],
})
export class Login {}