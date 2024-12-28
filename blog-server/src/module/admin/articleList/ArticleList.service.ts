import {ConflictException, HttpException, Injectable} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import { ArticleList } from '../../../db/entities/ArticleList'
import { FileService } from '../file/file.service'
import { formatTime } from '../../../common/commonly.fun'
import {ArticleFindParam, InsertArticleParam, UpdateArticleParam} from "./model/ArticleList.param";
import {PageRsult} from "../../../model/BaseRsult";
import {ArticleFindResult} from "./model/ArticleList.Rsult";
import {FindOperator} from "typeorm/find-options/FindOperator";
import {IdParam} from "../../../model/BaseParam";


@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleList) private articleRepository: Repository<ArticleList>,
        // @InjectRepository(User) private userRepository: Repository<User>,
        private fileService: FileService
    ) {}

    // 新增
    async insert(param: InsertArticleParam): Promise<void> {
        const article = new ArticleList()
        article.title = param.title;
        article.createDate = formatTime();
        article.createUserId = param.CreateUserId;
        article.classId = param.classId;
        article.clicks = 0;
        article.content = param.content;
        article.cover = param.cover !== null ? JSON.stringify(param.cover) : null
        await this.articleRepository.save(article)
    }

    // 修改
    async update(param: UpdateArticleParam): Promise<void> {
        const article = await this.articleRepository.findOne({where: { id: param.id }})
        article.title = param.title;
        article.updateTime = formatTime();
        article.classId = param.classId;
        article.content = param.content;
        article.cover = param.cover !== null ? JSON.stringify(param.cover) : null
        await this.articleRepository.save(article)
    }


    // 查询
    async list(param: ArticleFindParam): Promise<PageRsult<ArticleFindResult>> {
        const where: { classId?: number, title?: FindOperator<string>  } = { }
        if (typeof param.classId === 'number') where.classId = param.classId
        if (param.title && param.title.length) where.title = Like(`%${param.title || ''}%`)
        const list = await this.articleRepository.find({
            where,
            order: { createDate: "DESC" },
            skip: param.pageNum * ( param.page - 1),
            take: param.pageNum
        })
        const total = await this.articleRepository.count({where})
        return {
            list: list.map(item => new ArticleFindResult(item, false)),
            total
        }
    }

    // 单个查询
    async findOne(param: IdParam): Promise<ArticleFindResult> {
        const result = await this.articleRepository.findOne({
            where: { id: param.id }
        })
        if (result === null) throw new ConflictException("数据库中不存在该项");
        return new ArticleFindResult(result)
    }


    // 删除
    async delete(param: IdParam) :Promise<void> {
        const result = await this.articleRepository.findOne({ where: { id: param.id } })
        if (result === null) throw new ConflictException("数据库中不存在该项");
        await this.fileService.imgRemove(JSON.parse(result.cover))
        await this.articleRepository.delete({ id: param.id })
    }
}