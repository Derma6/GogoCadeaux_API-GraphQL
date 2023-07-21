import { PartnersService } from '@domain/partners/partners.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllPartnerUseCase {
  constructor(private readonly partnerService: PartnersService) {}

  async execute() {
    return this.partnerService.findAll();
  }
}
