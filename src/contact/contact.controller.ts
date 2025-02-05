import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ContactService } from './contact.service';
import { Auth } from "src/common/auth.decorator";
import { User } from "@prisma/client";
import { WebResponse } from "src/model/web.model";
import { ContactResponse, CreateContactRequest } from "src/model/contact.model";

@Controller('/api/contacts')
export class ContactController{
    constructor(private contactService:ContactService){

    }

    @Post()
    @HttpCode(200)
    async create(
        @Auth() user: User,
        @Body() request: CreateContactRequest
    ): Promise<WebResponse<ContactResponse>>{
        const result = await this.contactService.create(user, request); 
        return {
            data: result,
        }
    }
}