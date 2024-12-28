import {ConflictException, Injectable, NotFoundException} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { Custom } from '../../../db/entities/Custom'
import {CustomFindParam, CustomInsertParam, CustomUpdateParam} from "./model/Custom.param";
import {PageRsult} from "../../../model/BaseRsult";
import {IdParam} from "../../../model/BaseParam";
import {formatTime} from "../../../common/commonly.fun";


@Injectable()
export class CustomService {
    constructor(
        @InjectRepository(Custom) private customRepository: Repository<Custom>,
    ) {}

    // 新增
    async insert(body: CustomInsertParam): Promise<void> {
        const custom = await this.customRepository.findOne({where: { name: body.name }})
        if (custom) throw new ConflictException("已存在相同名称")
        const element = new Custom()
        element.content = body.content
        element.name = body.name
        element.createDate = formatTime()
        element.clicks = 0
        await this.customRepository.save(element)
    }


    // 修改
    async update(body: CustomUpdateParam): Promise<void> {
        const custom = await this.customRepository.findOne({where: { name: body.name }})
        if (!custom) throw new NotFoundException("项目不存在")
        custom.content = body.content
        custom.name = body.name
        await this.customRepository.save(custom)
    }

    // 查询
    async list(body: CustomFindParam): Promise<PageRsult<Custom>> {
        const list = await this.customRepository.find({
            select:[ 'id', 'name', 'createDate', 'clicks' ],
            where: { name: Like(`%${ body.name || '' }%`) },
            skip: body.pageNum * ( body.page - 1),
            take: body.pageNum
        })
        const total = await this.customRepository.count({where: { name: Like(`%${ body.name || '' }%`) }})
        return {
            list,
            total
        }
    }



    // 单个查询
    async findOne(body: IdParam): Promise<Custom> {
        const result = await this.customRepository.findOne({
            where: { id: body.id }
        })
        if (!result) throw new NotFoundException("项目不存在")
        return result
    }


    // 删除
    async delete(body: IdParam) :Promise<void> {
        await this.customRepository.delete({ id: body.id })
    }

}