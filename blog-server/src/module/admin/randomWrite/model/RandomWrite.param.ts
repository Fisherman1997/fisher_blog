    import {IsString, IsInt, IsArray, IsOptional} from 'class-validator'
    import {PageParam} from "../../../../model/BaseParam";


export class RandomWriteInsertParam {

    @IsString()
    content: string

    @IsArray()
    @IsOptional()       // 表示 search 字段是可选的
    cover_list?: string[]

    @IsInt()
    @IsOptional()
    CreateUserId?: number
}


export class RandomWriteUpdateParam extends RandomWriteInsertParam{
    @IsInt({ message: 'Id必须是整数类型' })
    id: number;

}

export class RandomWriteFindParam extends PageParam{
    @IsString()
    @IsOptional()       // 表示 search 字段是可选的
    content?: string
}
