
export enum ResultCodeEnum {
    Success = 200,
    Error = 500,
}

export interface ResultStruct<T = any> {
    statusCode: ResultCodeEnum;
    remarks: string;
    error?: string;
    result?: T;
}

