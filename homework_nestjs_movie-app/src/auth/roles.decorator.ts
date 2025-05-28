import { Reflector } from "@nestjs/core";
import { roleEnum } from "./enums/role-enum";

export const Roles = Reflector.createDecorator<roleEnum>();