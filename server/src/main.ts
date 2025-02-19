import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	console.log('bootstrap');
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	app.enableCors();
	console.log('POrt', process.env.PORT ?? 3000);
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
