import {IsOptional, IsString} from 'class-validator'
import {NameAndIdParam, NameParam, PageParam} from "../../../../model/BaseParam";


export class CustomInsertParam extends NameParam {
    @IsString()
    name: string
    @IsString({ message: 'content必须是字符类型' })
    content: string
}


export class CustomUpdateParam extends NameAndIdParam {
    @IsString({ message: 'content必须是字符类型' })
    content: string
}

export class CustomFindParam extends PageParam{
    @IsString()
    @IsOptional()       // 表示 search 字段是可选的
    name?: string;
}
