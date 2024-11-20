import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { SanityService } from '../sanity/sanity.service';

@Injectable()
export class EventsService {
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
    private readonly sanityService: SanityService,
  ) {}

  findEventsByGroupId(groupId: string) {
    return this.http
      .get(
        `https://graph.facebook.com/${groupId}/events?fields=description,end_time,name,place,start_time,id,cover`,
        {
          headers: {
            Authorization: `Bearer ${this.configService.get<string>(
              'WORKPLACE_AT',
            )}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .pipe(map((response) => response.data));
  }

  findAllKioskURLs(office: string) {
    return this.sanityService.client.fetch(
      `*[_type==$type && slug.current==$slug && !(_id in path("drafts.**"))][0]
              {
                kioskInterval,
                urls
              }`,
      { type: 'office', slug: office },
    );
  }
}
