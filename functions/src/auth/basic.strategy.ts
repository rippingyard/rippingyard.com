import { BasicStrategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(
  BasicStrategy,
  'basic-auth',
) {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  async validate(username: string, password: string) {
    const verifiedUsername = this.configService.get<string>('BAUTH_USER');
    const verifiedPassword = this.configService.get<string>('BAUTH_PASSWORD');
    return username === verifiedUsername && password === verifiedPassword;
  }
}
