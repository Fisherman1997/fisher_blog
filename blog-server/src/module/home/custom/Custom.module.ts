import { Module } from '@nestjs/common';
import  { TypeOrmModule } from '@nestjs/typeorm'
import { CustomController } from './Custom.controller'
import { CustomService } from './Custom.service'
import { Custom as ECustom } from '../../../db/entities/Custom'

@Module({
  imports: [TypeOrmModule.forFeature([ECustom])],
  controllers: [CustomController],
  providers: [CustomService],
})
export class Custom {}