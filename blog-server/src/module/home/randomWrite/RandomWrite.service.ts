import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { RandomWrite } from '../../../db/entities/RandomWrite'
import {PageRsult} from "../../../model/BaseRsult";
import {IdParam, PageParam} from "../../../model/BaseParam";


@Injectable()
export class RandomWriteService {
    constructor(
        @InjectRepository(RandomWrite) private randomWriteRepository: Repository<RandomWrite>,
    ) {}



    async list(body: PageParam): Promise<PageRsult<RandomWrite>> {
        let sql = `
            FROM random_write rw
            INNER JOIN \`user\` u 
            ON rw.createUserId = u.id
            ORDER BY rw.createDate DESC 
        `
        let list = await this.randomWriteRepository.query(`SELECT rw.id, rw.content, rw.cover_list, rw.createDate, rw.clicks, u.name createUserName, u.portrait  ${sql} LIMIT ${ (body.page - 1) * body.pageNum },${ body.pageNum };`)
        const [ total ] = await this.randomWriteRepository.query(`SELECT COUNT(rw.id) num ${sql}`)
        list = list.map(item => {
            item.cover_list = JSON.parse(item.cover_list)
            item.portrait = JSON.parse(item.portrait)
            return item
        })
        return {
            list,
            total: Number(total.num)
        }
    }

    async findOne(body: IdParam): Promise<RandomWrite> {
        let update =  `
            UPDATE random_write rw
            SET clicks = clicks + 1
            WHERE rw.id = ${ body.id }
        `
        let sql = `
            SELECT rw.id, rw.content, rw.cover_list, NULL title, rw.createDate, rw.clicks, u.name createUserName, NULL className, u.portrait
            FROM random_write rw
            INNER JOIN \`user\` u 
            ON rw.createUserId = u.id
            WHERE rw.id = ${ body.id }
        `
        await this.randomWriteRepository.query(update)
        const [ result ] = await this.randomWriteRepository.query(sql)
        result.cover_list = JSON.parse(result.cover_list)
        result.portrait = JSON.parse(result.portrait)
        return result
    }
}