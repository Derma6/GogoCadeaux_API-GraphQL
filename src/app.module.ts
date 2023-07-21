import { Module } from '@nestjs/common';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from '@infra/users/users.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { HealthModule } from '@infra/health/health.module';
import { ListsModule } from '@infra/lists/lists.module';
import { ArticlesModule } from '@infra/articles/articles.module';
import { AddressesModule } from '@infra/addresses/addresses.module';
import { AuthModule } from '@infra/auth/auth.module';
import { PartnerModule } from '@infra/partners/partner.module';
import { EnvironmentConfigModule } from '@/infra/config/environment-config/environment-config.module';
import { LoggerModule } from '@/infra/logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import {
  getTypeOrmModuleOptions,
  TypeOrmConfigModule,
} from '@infra/config/typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConfigService } from '@infra/config/environment-config/environment-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      isGlobal: true,
    }),
    EnvironmentConfigModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      cors: {
        origin: '*',
        credentials: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
    HealthModule,
    UsersModule,
    ListsModule,
    ArticlesModule,
    AddressesModule,
    AuthModule,
    PartnerModule,
    LoggerModule,
  ],
})
export class AppModule {}
