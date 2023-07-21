import { Module } from '@nestjs/common';
import { AddressesService } from '@domain/addresses/addresses.service';
import { AddressesResolver } from '@infra/addresses/addresses.resolver';

@Module({
  providers: [AddressesResolver, AddressesService],
})
export class AddressesModule {}
