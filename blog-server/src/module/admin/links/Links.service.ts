import {Injectable, NotFoundException} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Links } from '../../../db/entities/Links'
import {LinksInsertParam, LinksUpdateParam} from "./model/links.param";
import {PageRsult} from "../../../model/BaseRsult";
import {IdParam, PageParam} from "../../../model/BaseParam";

@Injectable()
export class LinksService {
    constructor(
        @InjectRepository(Links) private linksRepository: Repository<Links>,
    ) {}

    // 新增
    async insert(body: LinksInsertParam): Promise<void> {
        const link = new Links()
        link.name = body.name
        link.avatar = body.avatar
        link.http_url = body.http_url
        link.status = body.status
        link.description = body.description
        await this.linksRepository.save(link)
    }


    // 修改
    async update(body: LinksUpdateParam): Promise<void> {
        const link = await this.linksRepository.findOne({where: { id: body.id }})
        if (!link) throw new NotFoundException("不存在该项目")
        link.name = body.name
        link.avatar = body.avatar
        link.http_url = body.http_url
        link.status = body.status
        link.description = body.description
        await this.linksRepository.save(body)
    }

    // 查询
    async list(body: PageParam): Promise<PageRsult<Links>> {
        const list = await this.linksRepository.find({
            skip: body.pageNum * ( body.page - 1),
            take: body.pageNum
        })
        const total = await this.linksRepository.count()
        return {
            list,
            total
        }
    }


    // 删除
    async delete(body: IdParam) :Promise<void> {
        await this.linksRepository.delete({ id: body.id })
    }

}