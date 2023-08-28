import { ServeStaticModule } from '@nestjs/serve-static'
import { Module } from '@nestjs/common'
import { TracksModule } from './tracks/tracks.module'
import { MongooseModule } from '@nestjs/mongoose'
import { FileModule } from './file/file.module'
import * as path from 'path'

@Module({
  controllers: [],
  providers: [],
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://leon:22132@cluster0.tebzxo2.mongodb.net/?retryWrites=true&w=majority',
    ),
    TracksModule,
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
  ],
})
export class AppModule {}
