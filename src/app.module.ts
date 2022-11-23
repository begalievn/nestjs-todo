import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TodoModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get('MONGODB_URI'),
        }
      },
      inject: [ConfigService],
    }),
    CatsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
