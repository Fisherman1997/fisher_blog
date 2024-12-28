import {IsInt, IsOptional, IsString} from 'class-validator'
import {PageParam} from "../../../../model/BaseParam";

export class ArticleFindHomeParam extends PageParam {
    @IsInt()
    @IsOptional()
    classId?: number;

    @IsString()
    @IsOptional()       // 表示 search 字段是可选的
    search?: string;
}

export class ArticleAndRandomFindHomeParam extends PageParam{
    @IsString()
    @IsOptional()       // 表示 search 字段是可选的
    search?: string;
}

