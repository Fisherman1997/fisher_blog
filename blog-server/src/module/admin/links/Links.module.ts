import { Module } from '@nestjs/common';
import  { TypeOrmModule } from '@nestjs/typeorm'
import { LinksController } from './Links.controller'
import { LinksService } from './Links.service'
import { Links as ELinks } from '../../../db/entities/Links'


@Module({
  imports: [TypeOrmModule.forFeature([ELinks])],
  controllers: [LinksController],
  providers: [LinksService],
})
export class Links {}