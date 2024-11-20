import { BearerStrategy } from 'passport-azure-ad';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export default class AzureStrategy extends PassportStrategy(
  BearerStrategy,
  'azure',
) {
  constructor() {
    super(
      {
        identityMetadata:
          'https://login.microsoftonline.com/eggsdesign.onmicrosoft.com/v2.0/.well-known/openid-configuration',
        clientID: 'bf15e9f6-d9d4-44ca-a2fe-3c7a3e9c1064',
        issuer:
          'https://login.microsoftonline.com/c7e2b1b4-7370-4c50-8816-5487707f73c6/v2.0',
      },
      function (token: string, done: any) {
        if (!token) {
          return done(new UnauthorizedException('NO TOKEN'), {}, false);
        }
        return done(null, {}, true);
      },
    );
  }
}
