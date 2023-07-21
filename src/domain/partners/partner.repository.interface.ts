import { Partner } from '@infra/partners/partner.entity';

export interface PartnerRepositoryInterface {
  findAll(): Promise<Array<Partner>>;
}
