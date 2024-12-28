import { Injectable } from '@nestjs/common'
import { Request } from 'express';
import { createCanvas } from "canvas";
import * as os from 'os';

@Injectable()
export class CaptchaService {
    constructor(
    ) {}

    // private captchaMap: Map<string, string> = new Map();
    // 查询
    Get(req: Request) {
        const captchaText = this.GetCode(4);  // 生成验证码文本

        // 存储验证码文本到 session
        req.session['captcha'] = captchaText

        const size = 20
        const canvas = createCanvas((size * 4) - 10, size + 20);
        const ctx = canvas.getContext('2d');

        // 填充背景色
        ctx.fillStyle = 'SandyBrown';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 设置字体
        if (os.platform() === "linux")
        {
            ctx.font = `bold ${size}px DejaVu Sans`
        }
        else
        {
            ctx.font = `bold ${size}px Arial`
        }


        ctx.fillStyle = 'black';
        ctx.fillText(captchaText, 10, 30);

        for (let i = 0; i < 10; i++)
        {
            const x1 = Math.random() * canvas.width;
            const y1 = Math.random() * canvas.height;
            const x2 = Math.random() * canvas.width;
            const y2 = Math.random() * canvas.height;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = 'red';
            ctx.stroke();
        }

        return ctx.canvas.toBuffer('image/png');
    }


    private GetCode(length: number):string {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let code = ""
        for (let i = 0; i < length; i++)
        {
            code += chars[Math.floor(Math.random() * chars.length)]
        }
        return code
    }
}