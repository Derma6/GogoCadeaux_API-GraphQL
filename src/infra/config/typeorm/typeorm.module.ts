import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { EnvironmentConfigModule } from '@infra/config/environment-config/environment-config.module';
import { DataSource, DataSourceOptions } from 'typeorm';

export const getTypeOrmModuleOptions = async (
  configService: EnvironmentConfigService,
): Promise<TypeOrmModuleOptions> =>
  ({
    type: 'postgres',
    host: configService.getDatabaseHost(),
    port: configService.getDatabasePort(),
    username: configService.getDatabaseUser(),
    password: configService.getDatabasePassword(),
    database: configService.getDatabaseName(),
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: true,
  } as TypeOrmModuleOptions);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
