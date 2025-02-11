import { Module } from "@nestjs/common";
import { ContactController } from "./contact.controller";
import { ContactService } from './contact.service';

@Module({
    providers: [ContactService],
    exports: [ContactService],
    controllers: [ContactController]
})
export class ContactModule {

}