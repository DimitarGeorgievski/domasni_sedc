import { Module } from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { UserAddressController } from './user-address.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAdress, userAdressSchema } from './models/user-address.model';

@Module({
  imports: [
    MongooseModule.forFeature([{name: UserAdress.name, schema: userAdressSchema}])
  ],
  controllers: [UserAddressController],
  providers: [UserAddressService],
  exports: [UserAddressService],
})
export class UserAddressModule {}
