import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import AzureStrategy from './azure.strategy';

@Module({
  imports: [PassportModule],
  providers: [AzureStrategy],
})
export class AuthModule {}
