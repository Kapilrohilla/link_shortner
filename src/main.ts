import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Link Shortner')
    .setDescription(
      `A simple web app that allows users to shorten long URLs and share them easily.<br/> <b>Features: </b><br/> Generate short links from any valid URL
<br/>View statistics of short links, such as number of clicks, creation date `,
    )
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
