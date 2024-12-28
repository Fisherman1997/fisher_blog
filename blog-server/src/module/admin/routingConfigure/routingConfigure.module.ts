import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoutingConfigureController } from './routingConfigure.controller'
import { RoutingConfigureService } from './routingConfigure.service'
import { RoutingConfigure as ERoutingConfigure } from '../../../db/entities/RoutingConfigure'
import { User } from '../../../db/entities/User'


@Module({
  imports: [TypeOrmModule.forFeature([ERoutingConfigure, User])],
  controllers: [RoutingConfigureController],
  providers: [RoutingConfigureService],
})
export class RoutingConfigure {}