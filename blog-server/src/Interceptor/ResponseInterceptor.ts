import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ResultCodeEnum, ResultStruct } from '../model/ResposeRsulit';
import {SKIP_INTERCEPTOR_KEY} from "../common/public.docortor";
import { Reflector } from "@nestjs/core";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResultStruct<T>> {
    constructor(private reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<ResultStruct<T>> {

        const skipInterceptor = this.reflector.get<boolean>(SKIP_INTERCEPTOR_KEY, context.getHandler());

        // 如果有跳过拦截器的标记，则不进行拦截
        if (skipInterceptor) {
            return next.handle();
        }
        return next.handle().pipe(
            map(data => {
                // 默认返回成功的结果
                return {
                    statusCode: ResultCodeEnum.Success,
                    remarks: '成功',
                    result: data,
                };
            }),
            catchError(error => {
                console.error(error)
                return of({
                    statusCode:ResultCodeEnum.Error,
                    remarks: error.message || '失败',
                    error: error || null,
                })
            })
        );
    }
}
