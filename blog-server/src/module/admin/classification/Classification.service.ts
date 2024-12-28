import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Like, Not, Repository} from 'typeorm'
import {Classification} from '../../../db/entities/Classification'
import {findClassDto} from "./model/classification.param";
import {IdParam, NameAndIdParam, NameParam} from "../../../model/BaseParam";


@Injectable()
export class ClassificationService {
    constructor(
        @InjectRepository(Classification) private classRepository: Repository<Classification>
    ) {}

    // 查询
    async list(param: findClassDto): Promise<Array<Classification>>{
        return await this.classRepository.find({
            where: {name: Like(`%${param.name || ''}%`)},
            order: {id: 'ASC'}
        })
    }

    // 单项查询
    async findOne(body: IdParam): Promise<Classification> {
        return await this.classRepository.findOne({
            where: {id: body.id}
        })
    }

    // 新增
    async insert(body: NameParam): Promise<void> {
        const result = await this.classRepository.findOne({
            where: {name: body.name}
        })
        if (result) throw new NotFoundException("已存在相同的类")
        await this.classRepository.save(body)
    }

    // 新增
    async update(body: NameAndIdParam): Promise<void> {
        const result = await this.classRepository.findOne({ // 查询不同ID是否有相同code/name
            where: {name: body.name, id: Not(body.id)}
        })
        if (result) throw new NotFoundException("已存在相同的类")
        await this.classRepository.save(body)
    }

    // 删除
    async delete(body: IdParam): Promise<void>{
        await this.classRepository.delete({ id: body.id })
    }
}