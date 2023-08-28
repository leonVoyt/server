import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as mongoose from 'mongoose'

export type TracksDocument = HydratedDocument<Tracks>

@Schema()
export class Tracks {
  @Prop()
  name: string

  @Prop()
  artist: string

  @Prop()
  text: string

  @Prop()
  listens: number

  @Prop()
  picture: string

  @Prop()
  audio: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[]
}

export const TracksSchema = SchemaFactory.createForClass(Tracks)
