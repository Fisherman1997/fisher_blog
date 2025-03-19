import {Injectable, NotFoundException} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, IsNull, Repository } from "typeorm";
import { RoutingConfigure } from '../../../db/entities/RoutingConfigure'
import { User } from '../../../db/entities/User'
import {
    RoutingConfigureFindParam,
    RoutingConfigureInsertParam,
    RoutingConfigureUpdateParam
} from "./model/routingConfigure.param";
import {RoutingConfigureFindRsutl} from "./model/RoutingConfigure.Rsult";
import {IdParam} from "../../../model/BaseParam";
import {assignProps} from "../../../common/commonly.fun";



@Injectable()
export class RoutingConfigureService{
    constructor(
        @InjectRepository(RoutingConfigure) private routingRepository: Repository<RoutingConfigure>,
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    // 新增路由
    async insert(param: RoutingConfigureInsertParam): Promise<void> {

        if (!param.serialNumber || param.serialNumber === 0) {
            const serialNumber = await this.routingRepository.count()
            param.serialNumber = serialNumber + 1
        }
        const element = new RoutingConfigure()
        assignProps(element, param)
        await this.routingRepository.save(element)
    }

    // 修改路由
    async update(param: RoutingConfigureUpdateParam): Promise<void> {
        const element = await this.routingRepository.findOne({
            where: { id: param.id }
        })
        if (!element) throw new NotFoundException(`此项不存在`)
        assignProps(element, param)
        await this.routingRepository.save(element)
    }

    // 查询路由表
    async list(body: RoutingConfigureFindParam): Promise<Array<RoutingConfigureFindRsutl>> {
        let result = await this.routingRepository.find({
            where: { primary_id: IsNull() , range: body.range},
            order: {
                serialNumber: 'ASC'
            }
        })
        const parenArr = result.map((item) => item.id )
        const child = await this.routingRepository.find({
            where:{ primary_id: In(parenArr) }
        })

        return result.map((item) => {
            let children = child.filter((cItem) => cItem.primary_id === item.id)
            children = children.sort((a, b) => Number(a.serialNumber) - Number(b.serialNumber) )
            return new RoutingConfigureFindRsutl(item, children)
        })
    }

    // 删除路由
    async delete(body: IdParam): Promise<void> {
        const result = await this.routingRepository.find({
            where: [ { id: body.id },{ primary_id: body.id } ]
        })
        const ids = result.map(item => item.id)
        await this.routingRepository.delete(ids)
    }

    // 获取用户路由权限
    async getPowerRouter(body: IdParam): Promise<Array<RoutingConfigureFindRsutl>> {
        const user = await this.userRepository.findOne({
            where: { id: body.id }
        })
        let ids: number[] = JSON.parse(user.power)
        const routerList = await this.routingRepository.find({
            where: { id: In(ids) }
        })
        return routerList.filter(element => !element.primary_id)
        .map(item => {
            const children = routerList.filter((cItem) => cItem.primary_id === item.id)
            return new RoutingConfigureFindRsutl(item, children)
        })
    }
}