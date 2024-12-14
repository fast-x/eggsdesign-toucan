import { ConfigService } from '@nestjs/config';

export default class MockConfigService extends ConfigService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get(propertyPath: string) {
    return `mockvalue`;
  }
}
