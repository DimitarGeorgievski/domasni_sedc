import { PartialType } from "@nestjs/swagger";
import { CreateSkillDto } from "./create-skill.dto";

export class UpdateSkillsDto extends PartialType(CreateSkillDto){}