import { Module } from '@nestjs/common';
import { PartnerResolver } from '@infra/partners/partner.resolver';
import { PartnersService } from '@domain/partners/partners.service';
import { GetAllPartnerUseCase } from '@useCases/partners/get-all-partner.usecase';
import { PartnerRepositoryImpl } from '@infra/partners/partner.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from '@infra/partners/partner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Partner])],
  providers: [
    Partner,
    PartnerResolver,
    PartnersService,
    GetAllPartnerUseCase,
    {
      provide: 'PartnerRepository',
      useClass: PartnerRepositoryImpl,
    },
  ],
})
export class PartnerModule {}
