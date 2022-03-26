import { Controller, Get, Req } from '@nestjs/common';
import { HttpService } from './http.service';
import { Request } from 'express';

@Controller()
export class HttpController {
  constructor(private readonly httpService: HttpService) {}

  @Get('*')
  async ssr(@Req() req: Request): Promise<string> {
    return await this.httpService.ssr(req);
  }
}
