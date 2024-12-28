import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User as EntitiesUser } from '../../../db/entities/User'
import { UserController } from './User.controller'
import { UserService } from './User.service'
import {FileService} from "../file/file.service";

@Module({
  imports: [ TypeOrmModule.forFeature([EntitiesUser]) ],
  controllers: [UserController],
  providers: [UserService, FileService],
})
export class User {}