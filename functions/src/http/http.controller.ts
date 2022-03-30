import { Controller, Get, Header, Req } from '@nestjs/common';
import { HttpService } from './http.service';
import { Request } from 'express';

@Controller()
export class HttpController {
  constructor(private readonly httpService: HttpService) {}

  @Get('*')
  @Header('Cache-Control', 'public, max-age=300, s-maxage=600')
  async ssr(@Req() req: Request): Promise<string> {
    return await this.httpService.ssr(req);
  }
}
