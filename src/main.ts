import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
async function start() {
  try {
    const app = await NestFactory.create(AppModule)
    const PORT = process.env.PORT || 5000
    app.enableCors()
    await app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
  } catch (error) {
    console.log(error)
  }
}
start()
