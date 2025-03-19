import {ConflictException, Injectable, NotFoundException} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm' 
import { Repository, Not, Like } from 'typeorm'
import { Md5 } from 'ts-md5/dist/md5'
import { User } from '../../../db/entities/User'
import {
    UserFindParam,
    UserInsertParam,
    UserUpdateParam,
    UserUpdatePasswordParam,
    UserUpdatePowerParam
} from "./model/User.param";
import {PageRsult} from "../../../model/BaseRsult";
import {IdParam} from "../../../model/BaseParam";
import {FileService} from "../file/file.service";
import {assignProps} from "../../../common/commonly.fun";


@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User) private userRepository: Repository<User>,
        private fileService: FileService,
    ) {}
    
    // 新增用户
    async insert(body: UserInsertParam) :Promise<void>{
        const result = await this.userRepository.findOne({
            where: [{ code: body.code}, {name: body.name}]
        })
        if (result) {
            throw new ConflictException((
                result.code === body.code && result.name === body.name ? '已存在相同的账号和名称' :
                    result.name === body.name ? '已存在相同的名称' : '已存在相同的账号'
            ))
        }
        const element = new User()
        assignProps(element, body, ["password", "portrait"])
        element.password = Md5.hashStr(body.password) // 使用MD5加密
        if (body.portrait && body.portrait.length) element.portrait = JSON.stringify(body.portrait)
        await this.userRepository.save(element)
    }

    // 请求列表
    async list(body: UserFindParam): Promise<PageRsult<User>>{
        let list = await this.userRepository.find({
            where: { name: Like(`%${body.name ? body.name : ''}%`) },
            skip: body.pageNum * ( body.page - 1),
            take: body.pageNum
        })
        list = list.map(item => {
            if (item.portrait && item.portrait.length) item.portrait = JSON.parse(item.portrait)
            return item
        })
        const total = await this.userRepository.count({ where: { name: Like(`%${body.name ? body.name : ''}%`) } },)
        return {
            list,
            total
        }
    }

    // 修改用户信息
    async update(body: UserUpdateParam): Promise<void>{
        const result = await this.userRepository.findOne({ // 查询不同ID是否有相同code/name
            where: [{ code: body.code, id: Not(body.id)}, {name: body.name, id: Not(body.id)}]
        })
        if (result) {
            throw new ConflictException((
                result.code === body.code && result.name === body.name ? '已存在相同的账号和名称' :
                    result.name === body.name ? '已存在相同的名称' : '已存在相同的账号'
            ))
        }
        const user = await this.userRepository.findOne({where: { id: body.id }})

        assignProps(user, body, ["portrait"])
        if (body.portrait) user.portrait = body.portrait.length ? JSON.stringify(body.portrait) : null
        await this.userRepository.save(user)
    }

    // 修改密码
    async updatePassword(body: UserUpdatePasswordParam): Promise<void>{
        const result = await this.userRepository.findOne({
            where: { id: body.id }
        })
        if (!result) throw new NotFoundException("找不到该用户")
        if (Md5.hashStr(body.before_password) !== result.password) throw new ConflictException("请输入正确的密码")
        result.password = Md5.hashStr(body.password)
        result.token = ''
        await this.userRepository.save(result)
    }

    // 删除用户
    async delete(body: IdParam): Promise<void>{
        const result = await this.userRepository.findOne({
            where: { id: body.id }
        })
        const flies = JSON.parse(result.portrait) as Array<string>
        if (flies.length) await this.fileService.imgRemove(flies)
        await this.userRepository.delete({ id: body.id })
    }

    
    async updateUserPower(body: UserUpdatePowerParam): Promise<void>{
        const result = await this.userRepository.findOne({ 
            where: { id: body.id }
        })
        result.power = JSON.stringify(body.power)
        await this.userRepository.save(result)
    }

    async getUserPower(body:IdParam): Promise<Array<number>>{
        const result = await this.userRepository.findOne({ 
            where: { id: body.id }
        })
        return result.power && result.power.length ?  JSON.parse(result.power) as number[] : []
    }
}