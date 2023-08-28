import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'
export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  createFile(type: FileType, file): string {
    try {
      const fileExtansion = file.originalname.split('.').pop()
      const filename = uuid.v4() + '.' + fileExtansion
      const filepath = path.resolve(__dirname, '..', 'static', type)
      if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath, { recursive: true })
      }
      fs.appendFileSync(path.resolve(filepath, filename), file.buffer)
      return type + '/' + filename
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  deleteFile() {}
}
