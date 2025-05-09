import { IsString } from "class-validator";
import { CreateSkillDto } from "./create-skill.dto";

export class SkillsDto extends CreateSkillDto{
    @IsString()
    id: string
}