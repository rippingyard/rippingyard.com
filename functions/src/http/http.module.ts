import { Module } from '@nestjs/common';
import { HttpService } from './http.service';
import { HttpController } from './http.controller';
import { ConfigModule } from '@nestjs/config';
import { BasicAuthStrategy } from '../auth/basic.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env/local'],
    }),
    HttpModule,
  ],
  controllers: [HttpController],
  providers: [BasicAuthStrategy, HttpService],
})
export class HttpModule {}
