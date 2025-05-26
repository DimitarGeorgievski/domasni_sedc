import {IsString } from "class-validator";

export class CredentialDto{
    @IsString()
    email:string;
    @IsString()
    password:string;
}