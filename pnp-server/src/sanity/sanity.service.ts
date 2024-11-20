import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SanityClient } from '@sanity/client';
import sanityClient from '@sanity/client';

@Injectable()
export class SanityService {
  client: SanityClient;

  constructor(private readonly configService: ConfigService) {
    this.client = sanityClient({
      projectId: this.configService.get<string>('SANITY_PROJECT'),
      dataset: this.configService.get<string>('SANITY_DATASET'),
      apiVersion: '2021-08-18',
      token: this.configService.get<string>('SANITY_TOKEN'),
      useCdn: false,
    });
  }

  /**
   * @description proxy function for pure GROQs coming from the client
   * @param projectId
   * @param dataset
   * @param query
   * @param params
   */
  get(projectId: string, dataset: string, query: string, params = '{}') {
    const envKey = `SANITY_TOKEN_${projectId}`;
    const client: SanityClient = sanityClient({
      projectId,
      dataset,
      apiVersion: '2021-08-18',
      useCdn: false,
      token: this.configService.get<string>(envKey),
    });
    return client.fetch(query, JSON.parse(params));
  }
}
