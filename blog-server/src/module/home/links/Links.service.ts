import {Injectable} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Links } from '../../../db/entities/Links'

@Injectable()
export class LinksService {
    constructor(
        @InjectRepository(Links) private linksRepository: Repository<Links>,
    ) {}
    // 查询
    async list(): Promise<Array<Links>> {
        return await this.linksRepository.find()
    }
}