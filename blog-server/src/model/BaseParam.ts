import {IsInt, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class PageParam {

    @ApiProperty({
        description: '页',
        default: 1,
    })
    @IsInt({ message: 'page必须的整数类型' })
    page: number

    @ApiProperty({
        description: '数量',
        default: 10,
    })
    @IsInt({ message: 'pageNum必须的整数类型' })
    pageNum: number
}


export class IdParam {
    @IsInt({ message: 'Id必须是整数类型' })
    id: number
}

export class NameParam {
    @IsString({ message: 'name必须是字符串类型' })
    name: string
}


export class NameAndIdParam extends IdParam {
    @IsString({ message: 'name必须是字符串类型' })
    name: string
}