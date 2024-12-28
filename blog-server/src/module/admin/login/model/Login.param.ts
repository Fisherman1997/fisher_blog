import { IsString, IsEmail } from 'class-validator'


export class SignInParam {
    @IsString({ message: 'code必须的字符类型' })
    code: string
    
    @IsString({ message: 'password必须的字符类型' })
    password: string

    @IsString()
    captcha: string
}


export class ChankTokenParam {
    @IsString({ message: 'eMail必须的字符类型' })
    token: string
}
