import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'
import { TracksController } from './tracks.controller'
import { TracksService } from './tracks.service'
import { Tracks, TracksSchema } from './schemas/track.schema'
import { Comment, CommentSchema } from './schemas/comment.schema'
import { FileService } from 'src/file/file.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tracks.name,
        schema: TracksSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Comment.name,
        schema: CommentSchema,
      },
    ]),
  ],
  controllers: [TracksController],
  providers: [TracksService, FileService],
})
export class TracksModule {}
