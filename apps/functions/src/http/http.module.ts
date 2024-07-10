import { Module } from '@nestjs/common';
import { HttpService } from './http.service';
import { HttpController } from './http.controller';
import { ConfigModule } from '@nestjs/config';
import { BasicAuthStrategy } from '../auth/basic.strategy';
import configuration from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    HttpModule,
  ],
  controllers: [HttpController],
  providers: [BasicAuthStrategy, HttpService],
})
export class HttpModule {}
