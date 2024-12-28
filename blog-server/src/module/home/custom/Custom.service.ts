import {Injectable, NotFoundException} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Custom } from '../../../db/entities/Custom'
import {IdParam, NameParam} from "../../../model/BaseParam";
import {GetMarkdownSwitchHtml} from "../../../common/GetMarkdonwSwitchHTML";


@Injectable()
export class CustomService {
    constructor(
        @InjectRepository(Custom) private customRepository: Repository<Custom>,
    ) {}

    // 单个查询
    async findOne(body: NameParam): Promise<Custom> {
        const result = await this.customRepository.findOne({
            where: { name: body.name }
        })
        if (!result) throw new NotFoundException("项目不存在")
        result.content = GetMarkdownSwitchHtml(result.content)
        return result
    }
}