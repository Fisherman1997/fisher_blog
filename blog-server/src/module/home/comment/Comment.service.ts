import { Injectable, NotFoundException} from '@nestjs/common'
import { InjectRepository } from  '@nestjs/typeorm'
import { Repository, In, IsNull } from 'typeorm'
import { Comment } from '../../../db/entities/Comment'
import {assignProps, formatTime} from '../../../common/commonly.fun'
import { MailerService } from "@nestjs-modules/mailer"
import {CommentHomeFindParam, CommentInsertParam} from "./model/comment.param";
import {PageRsult} from "../../../model/BaseRsult";
import {CommentRsutl} from "./model/Comment.Rsutl";
import * as process from "node:process";
import e from "express";

@Injectable()
export class CommentService{
    constructor(
        @InjectRepository(Comment) private commentRepository: Repository<Comment>,
        private readonly mailerService: MailerService
    ) {}



    // 新增
    async insert (body: CommentInsertParam): Promise<void>{
        if (!body.content.length) throw new NotFoundException("别废话填！！！！")
        const element = new Comment()
        assignProps(element, body)
        element.createDate = formatTime()
        if (body.replyQQ !== element.qq) {
            const result = await this.setVerify(body)
            if (!result) throw new NotFoundException("邮箱发送失败，不知道为啥总之就是失败了，看看你的QQ对不对")
        }
        await this.commentRepository.save(element)
    }


    // 查找
    async findAll (body: CommentHomeFindParam): Promise<PageRsult<CommentRsutl>>{
        let list = await this.commentRepository.find({
            where: { articleId:  body.articleId , parentId: IsNull()},
            order:{ createDate: 'desc' },
            skip: body.pageNum * ( body.page - 1),
            take: body.pageNum
        })
        const parenArr = list.map((item) => item.id )
        const child = await this.commentRepository.find({
            where:{ parentId: In(parenArr) }
        })
        const total = await this.commentRepository.count({where: { articleId:  body.articleId , parentId: IsNull()}})
        return {
            list: list.map((item) => {
                const childList = child.filter((cItem) => cItem.parentId === item.id)
                return new CommentRsutl(item, childList)
            }),
            total: total + child.length
        }
    }

    // 发送到指定邮箱
    private async setVerify(entity: CommentInsertParam) : Promise<boolean> {
        return this.mailerService.sendMail({
            to: `${ entity.replyQQ ?? process.env.TAKEOVER_QQ }@qq.com `,
            from: process.env.EMAIL_USERNAME,
            subject: `在${process.env.WEBSITE_NAME}有人回复你`,
            html: `
                    <div style="font:normal 12px arial;border:1px solid #e6e7e9;margin:0 10px 10px 10px;padding:12px;">
                        <div>
                            <div style="background: white;width: 95%; max-width: 600px;margin: auto auto; border-radius: 5px;border:orange 1px solid;-webkit-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.12);box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.18);">             
                                <div style="padding: 5px 20px;">
                                    <p style="position: relative;color: white;float: left;z-index: 999;background: orange;padding: 5px 30px;margin: -25px auto 0 ;box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.30)">Blog</p>        
                                    <p style="font-size: 14px">
                                        在网站Fisherman
                                        <span style="font-size: 16px;">
                                            「<span style="text-decoration: none;color: orange">${ entity.reviewerName }</span> 」
                                        </span>
                                        回复了你
                                        <br>
                                     </p>
                                     <p style="font-size: 14px;border: 1px solid rgba(0,0,0,.3);padding: 10px;">
                                        ${entity.content}
                                    </p>
                                    <p style="font-size: 14px;">祝你生活美满，身体健康，萌萌哒</p>       
                                    <div style="text-align: center;">
                                        <p>
                                            <a href='${entity.articleUrl}' style="text-transform: uppercase;text-decoration: none;font-size: 14px;border: 2px solid #6c7575;color: #2f3333; padding: 10px; display: inline-block;margin: 10px auto 0; " target="_blank" rel="noopener">点击链接</a>
                                        </p>        
                                    </div>
                                    <p style="font-size: 12px;text-align: center;color: #999;">
                                        本邮件为网站自动发出
                                        <br> 
                                        ©2021-2024 渔夫Fisherman
                                    </p>       
                                </div>
                            </div>
                        </div>
                    </div>
                `
        })
        .then(() => {
            console.log('发送成功')
            return true
        })
        .catch(() => {
            console.log('发送失败')
            return false
        })
    }
}