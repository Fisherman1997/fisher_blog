import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comment as EComment } from '../../../db/entities/Comment'
import { CommentController } from './Comment.controller'
import { CommentService } from './Comment.service'

@Module({
  imports: [TypeOrmModule.forFeature([EComment]),HttpModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class Comment {}