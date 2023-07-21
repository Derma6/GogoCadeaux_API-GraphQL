import { Partner } from '@infra/partners/partner.entity';
import { PartnerRepositoryInterface } from '@domain/partners/partner.repository.interface';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';

export class PartnerRepositoryImpl implements PartnerRepositoryInterface {
  constructor(
    @Inject(Partner)
    private readonly partnerRepository: Repository<Partner>,
  ) {}
  async findAll() {
    return await this.partnerRepository.find();
  }
}
