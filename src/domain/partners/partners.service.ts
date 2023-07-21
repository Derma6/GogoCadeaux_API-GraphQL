import { Inject, Injectable } from '@nestjs/common';
import { PartnerRepositoryInterface } from '@domain/partners/partner.repository.interface';

@Injectable()
export class PartnersService {
  constructor(
    @Inject('PartnerRepository')
    private readonly partnerRepository: PartnerRepositoryInterface,
  ) {}

  async findAll() {
    return this.partnerRepository.findAll();
  }
}
