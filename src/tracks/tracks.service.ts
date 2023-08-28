import { Injectable } from '@nestjs/common'
import { Tracks, TracksDocument } from './schemas/track.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId, Schema } from 'mongoose'
import { Comment, CommentDocument } from './schemas/comment.schema'
import { CreateTrackDto } from './dto/create-track.dto'
import { CreateCommentDto } from './dto/create-comment.dto'
import { FileService, FileType } from 'src/file/file.service'

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Tracks.name) private trackModel: Model<TracksDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService,
  ) {}
  async create(dto: CreateTrackDto, picture, audio): Promise<Tracks> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture)

    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    })
    return track
  }
  async getAll(count = 10, offset = 0): Promise<Tracks[]> {
    const tracks = await this.trackModel.find().skip(offset).limit(count)
    return tracks
  }
  async getOne(id: ObjectId): Promise<Tracks> {
    const track = await this.trackModel.findById(id).populate('comments')
    return track
  }
  async deleteOne(id: ObjectId): Promise<Tracks> {
    const track = await this.trackModel.findByIdAndDelete(id)
    return track
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId)
    const comment = await this.commentModel.create({ ...dto })
    track.comments.push(comment.id)
    await track.save()
    return comment
  }

  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id)
    track.listens += 1
    await track.save()
  }

  async search(query: string): Promise<Tracks[]> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    })
    return tracks
  }
}
