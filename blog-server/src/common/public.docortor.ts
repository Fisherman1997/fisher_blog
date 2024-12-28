import { SetMetadata } from '@nestjs/common'

// 无需验证直接放行
export const Public = () => SetMetadata('isPublic', true)


export const SKIP_INTERCEPTOR_KEY = 'skipInterceptor';
export const SkipResponseInterceptor = () => SetMetadata(SKIP_INTERCEPTOR_KEY, true);