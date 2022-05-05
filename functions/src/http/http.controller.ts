import {
  Controller,
  Get,
  Header,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { HttpService } from './http.service';
import { Request } from 'express';
import { AuthExceptionFilter } from '../auth/exception.filter';
import { BasicAuthGuard } from '../auth/basic.guard';

@Controller()
export class HttpController {
  constructor(private readonly httpService: HttpService) {}

  @Get('*')
  @Header('Cache-Control', 'public, max-age=300, s-maxage=600')
  @UseFilters(new AuthExceptionFilter())
  @UseGuards(BasicAuthGuard)
  async ssr(@Req() req: Request): Promise<string> {
    return await this.httpService.ssr(req);
  }
}
