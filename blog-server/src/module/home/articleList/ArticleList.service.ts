import {Injectable, NotFoundException} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ArticleList } from '../../../db/entities/ArticleList'
import { GetChinese } from '../../../common/commonly.fun'
import {PageRsult} from "../../../model/BaseRsult";
import {ArticleAndRandomFindHomeParam, ArticleFindHomeParam} from "./model/ArticleList.param";
import {IdParam} from "../../../model/BaseParam";
import {GetMarkdownSwitchHtml} from "../../../common/GetMarkdonwSwitchHTML";
import {getTitle} from "../../../common/ProcessingText";
import {ArticleListResult} from "./model/Article.Rsutl";


@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleList) private articleRepository: Repository<ArticleList>
    ) {}
    // 查询
    async list(body: ArticleFindHomeParam): Promise<PageRsult<ArticleList>> {
        let sql = `
            (
                SELECT al.id, al.content, al.cover, al.title, al.createDate, al.clicks, u.name createUserName, al.className
                FROM (
                    SELECT al.id, LEFT(al.content,130) content, al.cover, al.title, al.createDate, al.clicks, al.createUserId, c.name className
                    FROM article_list al
                    INNER JOIN classification c
                    ON al.classId = c.id
                    ${body.classId ? 'WHERE al.classId IN (' + body.classId + ')' : ''}) al
                INNER JOIN \`user\` u
                ON al.createUserId = u.id
            ) al
            WHERE al.title LIKE '%${body.search || ''}%'
            ORDER BY al.createDate DESC
        `
        let getList = await this.articleRepository.query(`SELECT * FROM ${sql} LIMIT ${ (body.page - 1) * body.pageNum },${ body.pageNum };`) as Array<ArticleList>
        const [ total ] = await this.articleRepository.query(`SELECT COUNT(id) num FROM ${sql}`)
        getList = getList.map(item => {
            item.cover = JSON.parse(item.cover)
            item.content = GetChinese(item.content)
            return item
        })
        return {
            list: getList,
            total: Number(total.num)
        }
    }


    
    // 单个查询
    async findOne(body: IdParam): Promise<ArticleList> {
        const article = await this.articleRepository.findOne({
            where: { id: body.id }
        })
        if (!article) throw new NotFoundException("找不到该文章")

        article.clicks = Number(article.clicks) + 1
        await this.articleRepository.save(article)

        const [ result ] = await this.articleRepository.query(`
            SELECT * 
            FROM (
                SELECT al.id, al.content, al.cover, al.title, al.createDate, al.clicks, u.name createUserName, al.className
                FROM (
                    SELECT al.id, al.content, al.cover, al.title, al.createDate, al.clicks, al.createUserId, c.name className
                    FROM article_list al 
                    INNER JOIN classification c 
                    ON al.classId = c.id) al
                INNER JOIN \`user\` u 
                ON al.createUserId = u.id
            ) al
            WHERE al.id = ${body.id};
        `)
        const [ before ] = await this.articleRepository.query(`
            SELECT id , title 
            FROM article_list
            WHERE id < ${body.id} 
            ORDER BY id DESC limit 1;
        `)
        const [ after ] = await this.articleRepository.query(`
            SELECT id , title 
            FROM article_list
            WHERE id > ${body.id}
            ORDER BY id ASC limit 1;
        `)
        result.before = before || null
        result.after = after || null
        result.cover = JSON.parse(result.cover)
        result.content = GetMarkdownSwitchHtml(result.content)
        result.contents = getTitle(result.content)
        return result
    }


    async findArticleAndRandomWrite(body: ArticleAndRandomFindHomeParam): Promise<PageRsult<ArticleListResult>> {
        const sql = `
        (
            SELECT al.id, LEFT(al.content,130) content, al.cover_list, al.title, al.createDate, al.clicks, u.name createUserName, al.className, u.portrait
            FROM (
                SELECT al.id, al.content, al.cover cover_list, al.title, al.createDate, al.clicks, al.createUserId, c.name className
                FROM article_list al 
                INNER JOIN classification c 
                ON al.classId = c.id) al
            INNER JOIN \`user\` u 
            ON al.createUserId = u.id
            UNION
            SELECT rw.id, rw.content, rw.cover_list, NULL title, rw.createDate, rw.clicks, u.name createUserName, NULL className, u.portrait
            FROM random_write rw
            INNER JOIN \`user\` u 
            ON rw.createUserId = u.id) list
        WHERE content LIKE '%${ body.search || '' }%' OR title LIKE '%${ body.search || '' }%'
        ORDER BY list.createDate DESC `
        let list = await this.articleRepository.query(`SELECT * FROM ${sql} LIMIT ${ (body.page - 1) * body.pageNum },${ body.pageNum };`)
        const total = await this.articleRepository.query(`SELECT COUNT(id) num FROM ${sql}`)
        return {
            list: list.map((item) => new ArticleListResult(item)),
            total: Number(total[0].num)
        }
    }
}