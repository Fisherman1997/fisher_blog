import { Module } from '@nestjs/common';
import  { TypeOrmModule } from '@nestjs/typeorm'
import { RandomWriteController } from './RandomWrite.controller'
import { RandomWriteService } from './RandomWrite.service'
import { RandomWrite as ERandomWrite } from '../../../db/entities/RandomWrite'
import { User } from '../../../db/entities/User'
import { FileService } from '../file/file.service'

@Module({
  imports: [TypeOrmModule.forFeature([ERandomWrite, User])],
  controllers: [RandomWriteController],
  providers: [RandomWriteService, FileService],
})
export class RandomWrite {}