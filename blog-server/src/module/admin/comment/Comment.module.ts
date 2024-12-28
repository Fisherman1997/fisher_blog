import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comment as EComment } from '../../../db/entities/Comment'
import { CommentController } from './Comment.controller'
import { CommentService } from './Comment.service'

@Module({
  imports: [TypeOrmModule.forFeature([EComment])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class Comment {}