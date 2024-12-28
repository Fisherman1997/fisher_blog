import { Request, Response, NextFunction } from 'express';
import { existsSync, mkdirSync, readFile, writeFileSync, } from 'fs'
import { resolve } from 'path'


export async function logger(req: Request, res: Response, next: NextFunction) {
    const beforeDate: Date = new Date();
    next();

    const dateString: string = beforeDate.toISOString().split('T')[0];

    if (!existsSync(resolve('./log'))) {
        mkdirSync(resolve('./log'));
    }

    const logFilePath = resolve(`./log/${dateString}.txt`);
    readFile(logFilePath, 'utf8', (err, data) => {
        let logContent = '';
        if (err) {
            writeFileSync(logFilePath, '');
        } else {
            logContent = data || '';
        }

        logContent += `${new Date().toLocaleString()} [${req.method}请求]：${req.url} 状态：${res.statusCode} ${res.statusMessage || '成功'}\n`;
        writeFileSync(logFilePath, logContent);
    });

    console.log(`${new Date().toLocaleString()} [${req.method}请求]：${req.url} 状态：${res.statusCode} ${res.statusMessage || '成功'}`);
}