import { Controller, Post, Header, Req } from '@nestjs/common';
import { fetchUrlService } from './fetchUrl.service';
import { Request } from 'express';
// import cors from 'cors';

@Controller()
export class fetchUrlController {
  constructor(private readonly fetchUrlService: fetchUrlService) {}

  @Post('/')
  @Header('Cache-Control', 'public, max-age=300, s-maxage=600')
  // @Header(cors({ origin: true }));
  async fetchUrl(@Req() req: Request): Promise<any> {
    return await this.fetchUrlService.exec(req);
  }
}
