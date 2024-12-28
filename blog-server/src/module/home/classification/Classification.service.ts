import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Classification} from '../../../db/entities/Classification'


@Injectable()
export class ClassificationService {
    constructor(
        @InjectRepository(Classification) private classRepository: Repository<Classification>
    ) {}

    // 查询
    async list(): Promise<Array<Classification>>{
        return await this.classRepository.find()
    }
}