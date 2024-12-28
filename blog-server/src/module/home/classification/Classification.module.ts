import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassificationController } from './Classification.controller'
import { ClassificationService } from './Classification.service'
import { Classification as EntitiesClassification } from '../../../db/entities/Classification'

@Module({
  imports: [TypeOrmModule.forFeature([EntitiesClassification])],
  controllers: [ClassificationController],
  providers: [ClassificationService],
})
export class Classification {}