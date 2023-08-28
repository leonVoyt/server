import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as mongoose from 'mongoose'
import { Tracks } from './track.schema'

export type CommentDocument = HydratedDocument<Comment>

@Schema()
export class Comment {
  @Prop()
  userNname: string

  @Prop()
  text: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tracks' })
  track: Tracks
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
