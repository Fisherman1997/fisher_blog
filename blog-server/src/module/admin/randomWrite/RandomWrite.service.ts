import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { RandomWrite } from '../../../db/entities/RandomWrite'
import { FileService } from '../file/file.service'
import { assignProps, formatTime } from '../../../common/commonly.fun'
import {RandomWriteFindParam, RandomWriteInsertParam, RandomWriteUpdateParam} from "./model/RandomWrite.param";
import {PageRsult} from "../../../model/BaseRsult";
import {IdParam} from "../../../model/BaseParam";


@Injectable()
export class RandomWriteService {
    constructor(
        @InjectRepository(RandomWrite) private randomWriteRepository: Repository<RandomWrite>,
        private fileService: FileService
    ) {}

    // 新增
    async insert(body: RandomWriteInsertParam): Promise<void> {
        const random = new RandomWrite()
        assignProps(random, body)
        // random.createUserId = body.CreateUserId
        random.createDate = formatTime()
        // random.content = body.content
        random.clicks = 0
        if (body.cover_list) random.cover_list = JSON.stringify(body.cover_list)
        await this.randomWriteRepository.save(random)
    }


    // 修改
    async update(body:RandomWriteUpdateParam): Promise<void> {
        const random = await this.randomWriteRepository.findOne({where: {id: body.id}})
        random.updateTime = formatTime()
        random.content = body.content
        if (body.cover_list) random.cover_list = JSON.stringify(body.cover_list)
        await this.randomWriteRepository.save(random)
    }

    // 查询
    async list(body: RandomWriteFindParam): Promise<PageRsult<RandomWrite>> {
        const list = await this.randomWriteRepository.find({
            where: { content: Like(`%${ body.content || '' }%`) },
            order: { createDate: "DESC" },
            skip: body.pageNum * ( body.page - 1),
            take: body.pageNum
        })
        list.forEach((element, index) => {
            if (list[index].cover_list) {
                list[index].cover_list = JSON.parse(list[index].cover_list)
            }
        })
        const total = await this.randomWriteRepository.count({where: { content: Like(`%${ body.content || '' }%`) }})
        return {
            list,
            total
        }
    }



    // 单个查询
    async findOne(body: IdParam): Promise<RandomWrite> {
        const result = await this.randomWriteRepository.findOne({
            where: { id: body.id }
        })
        if (result.cover_list) result.cover_list = JSON.parse(result.cover_list)
        return result
    }


    // 删除
    async delete(body:IdParam) :Promise<void> {
        const result = await this.randomWriteRepository.findOne({ where: { id: body.id } })
        if (result.cover_list && result.cover_list.length) await this.fileService.imgRemove(JSON.parse(result.cover_list))
        await this.randomWriteRepository.delete({ id: body.id })
    }

}