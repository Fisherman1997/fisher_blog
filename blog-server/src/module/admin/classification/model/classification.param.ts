import {IsInt, IsOptional, IsString} from 'class-validator'


export class findClassDto {
    @IsString()
    @IsOptional()       // 表示 search 字段是可选的
    name?: string
}
