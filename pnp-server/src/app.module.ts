import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ApproachesModule } from './approaches/approaches.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AzureAuthGuard } from './auth/azure-auth.guard';
import { DocumentsModule } from './documents/documents.module';
import { EmployeesModule } from './employees/employees.module';
import { FeaturesModule } from './features/features.module';
import { FiltersModule } from './filters/filters.module';
import { ReferencesModule } from './references/references.module';
import { ProjectsModule } from './projects/projects.module';
import { AssetsController } from './assets/assets.controller';
import { AssetsService } from './assets/assets.service';
import { SanityService } from './sanity/sanity.service';
import { ClientsModule } from './clients/clients.module';
import { EventsModule } from './events/events.module';
import { SanityModule } from './sanity/sanity.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    ApproachesModule,
    AuthModule,
    DocumentsModule,
    EmployeesModule,
    FeaturesModule,
    FiltersModule,
    ReferencesModule,
    ProjectsModule,
    ClientsModule,
    EventsModule,
    SanityModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AzureAuthGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    AssetsService,
    SanityService,
  ],
  controllers: [AssetsController],
})
export class AppModule {}
