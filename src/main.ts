import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Link Shortner')
    .setDescription(
      `A simple web app that allows users to shorten long URLs and share them easily.<br/>
       <b>Features: </b>
       <ul>
        <li>Generate short links from any valid URL</li>
        <li>View statistics of short links, such as number of clicks, creation date <br/></li>
       </ul>
       <b>Tech Stack - </b>
      <ul>
      <li>TypeScript</li>
      <li>NestJs</li>
      <li>MongoDb + Mongoose</li>
      </ul>

`,
    )
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
