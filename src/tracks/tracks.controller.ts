import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { TracksService } from './tracks.service'
import { CreateTrackDto } from './dto/create-track.dto'
import { ObjectId } from 'mongoose'
import { CreateCommentDto } from './dto/create-comment.dto'
import { FileFieldsInterceptor } from '@nestjs/platform-express'

@Controller('/tracks')
export class TracksController {
  constructor(private trackService: TracksService) {}
  @Get('/search')
  search(@Query('query') query: string) {
    return this.trackService.search(query)
  }
  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.trackService.getAll(count, offset)
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id)
  }
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
    const { picture, audio } = files

    return this.trackService.create(dto, picture[0], audio[0])
  }

  @Post('/comment')
  addComent(@Body() dto: CreateCommentDto) {
    return this.trackService.addComment(dto)
  }

  @Post('/listen/:id')
  listen(@Param('id') id: ObjectId) {
    return this.trackService.listen(id)
  }
  @Delete(':id')
  deleteOne(@Param('id') id: ObjectId) {
    return this.trackService.deleteOne(id)
  }
}
