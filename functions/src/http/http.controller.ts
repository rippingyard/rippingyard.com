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
import { AuthGuard } from '@nestjs/passport';
import { AuthExceptionFilter } from '../auth/exception.filter';
import { ConfigService } from '@nestjs/config';

@Controller()
export class HttpController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Get('*')
  @Header('Cache-Control', 'public, max-age=300, s-maxage=600')
  @UseFilters(new AuthExceptionFilter())
  @UseGuards(AuthGuard('basic-auth'))
  async ssr(@Req() req: Request): Promise<string> {
    const result = await this.httpService.ssr(req);
    console.log(this.configService.get<string>('NODE_ENV'));
    return result;
  }
}
