import {IsInt, IsOptional, IsString} from 'class-validator'
import {PageParam} from "../../../../model/BaseParam";




export class CommentInsertParam {
    @IsString({ message: 'articleId必须是字符类型' })
    articleId: string

    @IsString({ message: 'content必须要是字符类型' })
    content: string

    @IsString({ message: 'reviewerName必须要是字符类型' })
    reviewerName: string

    @IsString({ message: 'qq必须要是字符类型' })
    qq: string

    @IsString()
    articleUrl: string

    @IsOptional()       // 表示 search 字段是可选的
    @IsString()
    replyQQ?: string

    @IsOptional()       // 表示 search 字段是可选的
    @IsInt()
    parentId?: number

    @IsOptional()       // 表示 search 字段是可选的
    @IsString()
    httpsrc?: string

    @IsOptional()       // 表示 search 字段是可选的
    @IsString()
    replyName?: string
}



export class CommentHomeFindParam extends PageParam {
    @IsString()
    articleId: string
}