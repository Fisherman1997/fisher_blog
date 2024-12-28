import {IsString, IsInt, IsArray, IsOptional} from 'class-validator'
import {IdParam, PageParam} from "../../../../model/BaseParam";

export class UserInsertParam {
    @IsString({ message: 'name必须的字符类型' })
    name: string

    @IsString({ message: 'code必须的字符类型' })
    code: string

    @IsInt({ message: 'status必须的整数类型' })
    status: number
    
    @IsString({ message: 'password必须的字符类型' })
    password: string

    @IsArray()
    portrait: string[]
}

export class UserUpdateParam extends IdParam{
    @IsString({ message: 'name必须的字符类型' })
    name: string
    
    @IsString({ message: 'code必须的字符类型' })
    code: string

    @IsInt({ message: 'status必须的整数类型' })
    status: number

    @IsArray()
    portrait: string[]
}

export class UserUpdatePasswordParam extends IdParam {
    @IsString({ message: 'before_password必须的字符类型' })
    before_password: string
    
    @IsString({ message: 'password必须的字符类型' })
    password: string
}


export class UserFindParam extends PageParam {
    @IsString({ message: 'id必须的整数类型' })
    @IsOptional()       // 表示 search 字段是可选的
    name?: number
}

export class UserUpdatePowerParam extends IdParam {
    @IsArray({ message: 'power必须的数组类型' })
    power: number[]
}

