import {IsString, IsInt, IsOptional} from 'class-validator'


export class RoutingConfigureInsertParam {
    @IsString({ message: 'title必须是字符类型' })
    title: string

    @IsString({ message: 'path必须是字符类型' })
    path: string

    @IsString({ message: 'component' })
    component: string;

    @IsInt({ message: 'range必须是整数类型' })
    range: number;

    @IsInt({ message: 'menu必须是整数类型' })
    menu: number;

    @IsString({ message: 'redirect必须是整数类型' })
    redirect: string;

    @IsInt({ message: 'status必须是整数类型' })
    status: number;

    @IsInt({ message: 'status必须是整数类型' })
    @IsOptional()       // 表示 search 字段是可选的
    serialNumber?: number;
}


export class RoutingConfigureUpdateParam extends RoutingConfigureInsertParam{
    @IsInt({ message: 'id必须是整数类型' })
    id: number
}



export class RoutingConfigureFindParam {
    @IsInt({ message: 'range必须是整数类型' })
    range: number;
}

