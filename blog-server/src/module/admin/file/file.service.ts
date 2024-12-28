import {ConflictException, Injectable} from '@nestjs/common'
import { existsSync, mkdirSync, unlinkSync , writeFileSync } from "fs";
import SnowflakeId from "snowflake-id"
import { resolve } from "path";
import { Express } from 'express'

@Injectable()
export class FileService {
    constructor () {}
    

    async imgAdd(files: Array<Express.Multer.File>): Promise<Array<string>> {
        if (!existsSync(resolve('./public/imgS'))) mkdirSync(resolve('./public/imgS'))
        const result: string[] = []
        files.forEach(item => {
            const name = this.nomenclature()
            result.push(`/imgS/${name}.${item.mimetype.split('/')[1]}`)
            writeFileSync(resolve(`./public/imgS/${name}.${item.mimetype.split('/')[1]}`), item.buffer)
        })
        return result
    }

    async imgRemove (fileNames: string[]): Promise<void> {
        let state: string 
        fileNames = fileNames.map((item: string) => {
            return item.split('/imgS').join('')
        })
        fileNames.forEach((item: string) => {
            try{
                 unlinkSync(resolve(`./public/imgS${item}`))
            }catch (err){
                if (typeof state !== 'string') state = ''
                state += '无法删除不存在图片' + item + '其他已正常删除，'
            }
        })
        if (state && state.length !== 0) throw new ConflictException(state)
    }
    private nomenclature(): string {
        // 生成名称
        const id = new SnowflakeId()
        return id.generate() as string
    }
}