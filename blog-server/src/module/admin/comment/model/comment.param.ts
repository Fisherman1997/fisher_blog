import {IdParam, PageParam} from "../../../../model/BaseParam";
import {IsOptional, IsString} from "class-validator";


export class CommentFindParam extends PageParam {
    @IsString()
    @IsOptional()       // 表示 search 字段是可选的
    articleName?: string;

    @IsString()
    @IsOptional()       // 表示 search 字段是可选的
    content?: string;
}

export class CommentUpdateParam extends IdParam {
    @IsString()
    content: string;
}