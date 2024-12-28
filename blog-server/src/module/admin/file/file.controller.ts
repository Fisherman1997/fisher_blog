import {Controller, Post, Body, UseInterceptors, UploadedFiles, HttpStatus} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { FileService } from './file.service'
import {ApiTags, ApiResponse, ApiBody} from '@nestjs/swagger';


@ApiTags('file')  // 用于给路由分组
@Controller('api/file')
export class FileController {
    constructor (private readonly FileService: FileService) {}

    @ApiBody({ type: Array<Express.Multer.File> })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED,type: Array<string>, description: '成功'})
    @Post('img/add')
    @UseInterceptors(FilesInterceptor('files'))
    ImgAdd (@UploadedFiles() files: Array<Express.Multer.File>): Promise<Array<string>> {
        return this.FileService.imgAdd(files)
    }

    @ApiBody({ type: Array<string> })  // 描述请求体
    @ApiResponse({status: HttpStatus.CREATED, description: '成功'})
    @Post('img/remove')
    ImgRemove (@Body() fileNames: string[]): Promise<void> {
        return this.FileService.imgRemove(fileNames)
    }
}