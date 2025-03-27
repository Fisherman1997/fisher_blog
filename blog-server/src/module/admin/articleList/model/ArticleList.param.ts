import {IsString, IsInt, IsArray, IsOptional} from 'class-validator'
import {IdParam, PageParam} from "../../../../model/BaseParam";
// import {ApiObjectProperties} from "../../../../common/ApiObjectProperties";

// @ApiObjectProperties
export class InsertArticleParam {
    @IsArray({ message: 'cover必须是数组类型' })
    cover: string[];

    @IsString({ message: 'title必须是字符类型' })
    title: string

    @IsString({ message: 'content必须是字符类型' })
    content: string

    @IsInt({ message: 'classId必须是字符类型' })
    classId: number;

    @IsInt()
    createUserId: number
}


export class ArticleFindParam extends PageParam{
    @IsInt()
    @IsOptional()
    classId?: number

    @IsString()
    @IsOptional()       // 表示 search 字段是可选的
    title?: string
}


export class UpdateArticleParam extends IdParam{

    @IsArray({ message: 'cover必须是数组类型' })
    cover: string[];

    @IsString({ message: 'title必须是字符类型' })
    title: string

    @IsString({ message: 'content必须是字符类型' })
    content: string

    @IsInt({ message: 'classId必须是字符类型' })
    classId: number;
}
