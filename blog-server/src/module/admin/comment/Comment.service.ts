import {Injectable, NotFoundException} from '@nestjs/common'
import { InjectRepository } from  '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import { Comment } from '../../../db/entities/Comment'
import {CommentFindParam, CommentUpdateParam} from "./model/comment.param";
import {PageRsult} from "../../../model/BaseRsult";
import {FindOperator} from "typeorm/find-options/FindOperator";
import {IdParam} from "../../../model/BaseParam";

@Injectable()
export class CommentService{
    constructor(
        @InjectRepository(Comment) private commentRepository: Repository<Comment>
    ) {}


    // 新增
    async update (body: CommentUpdateParam): Promise<void>{
        const comment = await this.commentRepository.findOne({ where: { id: body.id } })
        if (!comment) throw new NotFoundException("该项不存在")
        comment.content = body.content
        await this.commentRepository.save(comment)
    }


    // 查找
    async findAll (body: CommentFindParam): Promise<PageRsult<Comment>>{
        let where: { articleName?: FindOperator<string>, content?: FindOperator<string> } = {  }
        if (body.articleName && body.articleName.length) where.articleName = Like(`%${ body.articleName }%`)
        if (body.content && body.content.length) where.content = Like(`%${ body.content }%`)
        let result = await this.commentRepository.find({
            where,
            order:{ createDate: 'DESC' },
            skip: body.pageNum * ( body.page - 1),
            take: body.pageNum
        })
        let total = await this.commentRepository.count({ where })
        return {
            list: result,
            total
        }
    }

    async delete (body: IdParam): Promise<void> {
       await this.commentRepository.delete({ id: body.id })
    }
}