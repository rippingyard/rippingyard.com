import { Module } from '@nestjs/common';
import { HttpService } from './http.service';
import { HttpController } from './http.controller';

@Module({
  imports: [HttpModule],
  controllers: [HttpController],
  providers: [HttpService],
})
export class HttpModule {}
