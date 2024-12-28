import {IsString, IsInt, IsOptional} from 'class-validator'


export class LinksInsertParam {
    @IsString({ message: 'content必须是字符类型' })
    name: string

    @IsString({ message: 'content必须是字符类型' })
    avatar: string
    
    @IsString({ message: 'content必须是字符类型' })
    http_url: string

    @IsString()
    @IsOptional()
    description: string

    @IsInt()
    status?: number
}


export class LinksUpdateParam extends LinksInsertParam{
    @IsInt({ message: 'Id必须是整数类型' })
    id: number;
}
