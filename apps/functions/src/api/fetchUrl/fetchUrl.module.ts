import { Module } from '@nestjs/common';
import { fetchUrlService } from './fetchUrl.service';
import { fetchUrlController } from './fetchUrl.controller';

@Module({
  imports: [FetchUrlModule],
  controllers: [fetchUrlController],
  providers: [fetchUrlService],
})
export class FetchUrlModule {}
