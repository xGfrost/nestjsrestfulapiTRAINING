import { Module } from "@nestjs/common";
import { AddressService } from "./address.service";
import { AddressController } from "./address.controller";
import { ContactService } from "src/contact/contact.service";
import { ContactModule } from "src/contact/contact.module";

@Module({
    imports: [ContactModule],
    providers:  [AddressService],
    controllers: [AddressController],
})
export class AddressModule{}