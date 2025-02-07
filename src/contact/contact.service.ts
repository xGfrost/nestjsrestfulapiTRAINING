import { HttpException, Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from 'winston';
import { PrismaService } from 'src/common/prisma.service';
import { ContactResponse, CreateContactRequest, UpdateContactRequest } from "src/model/contact.model";
import { ValidationService } from "src/common/validation.service";
import { ContactValidation } from "./contact.validation";
import { Contact, User } from "@prisma/client";

@Injectable()
export class ContactService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
        private validationService: ValidationService
    ){}

    async create (user: User, request: CreateContactRequest): Promise<ContactResponse> {
        this.logger.debug(`ContactService.create(${JSON.stringify(user)}${JSON.stringify(request)})`);
        const createRequest: CreateContactRequest = this.validationService.validate (ContactValidation.CREATE, request,);

        const contact = await this.prismaService.contact.create({
            data: {
                ...createRequest,
                ...{ username: user.username },
            },
        });
        return this.toContactResponse(contact);
    }

    toContactResponse(contact: Contact): ContactResponse {
        return {
            id: contact.id,
            first_name: contact.first_name,
            last_name: contact.last_name,
            email:contact.email,
            phone:contact.phone,
        }
    }

    async checkContactMustExists(username: string, contactId:number): Promise<Contact>{
        const contact = await this.prismaService.contact.findFirst({
            where: {
                username: username,
                id: contactId,
            }
        })
        if (!contact){
            throw new HttpException(`contact is not found`, 404)
        }
        return contact;
    }

    async get(user: User, contactId: number): Promise<ContactResponse>{
        const contact = await this.checkContactMustExists(user.username, contactId);
        return this.toContactResponse(contact);
    }

    async update(user: User, request: UpdateContactRequest): Promise<ContactResponse>{
        const updateRequest = this.validationService.validate(ContactValidation.UPDATE, request);
        let contact = await this.checkContactMustExists(user.username, request.id)
        contact = await this.prismaService.contact.update({
            where: {
                id: contact.id,
                username: contact.username,
            },
            data: updateRequest,
        })
        return this.toContactResponse(contact);
    }
    };
