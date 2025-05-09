import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillsDto } from './dto/update-skill.dto';

@Controller('skills')
export class SkillsController {
    constructor(private readonly skillService: SkillsService){}
    @Get()
    getAll(){
       return this.skillService.getAll(); 
    }
    @Get(":id")
    getById(@Param("id") id: string){
        return this.skillService.getById(id);
    }
    @Post()
    create(@Body() body: CreateSkillDto){
        return this.skillService.create(body);
    }
    @HttpCode(204)
    @Patch(":id")
    update(@Param("id") id: string, @Body() body: UpdateSkillsDto){
        return this.skillService.update(id,body);
    }
    @HttpCode(204)
    @Delete(":id")
    delete(@Param("id") id: string){
        return this.skillService.delete(id);
    }
}
