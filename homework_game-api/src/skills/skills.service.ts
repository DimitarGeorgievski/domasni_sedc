import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import { CreateSkillDto } from './dto/create-skill.dto';
import { readFile, writeFile } from 'fs/promises';
import { SkillsDto } from './dto/skills.dto';
import { v4 as uuid } from 'uuid';
import { UpdateSkillsDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
    private SKILLS_PATH = join(process.cwd(), 'data', 'skills.json');
    async saveSkills(data: SkillsDto[]){
        await writeFile(this.SKILLS_PATH, JSON.stringify(data,null,2), "utf-8");
    }
    async getAll(){
        const skillsJson = await readFile(this.SKILLS_PATH, "utf-8");
        const skills = JSON.parse(skillsJson) as SkillsDto[];
        return skills;
    }
    async getById(id: string){
        const skills = await this.getAll();
        const skill = skills.find(skill => skill.id === id);
        if(!skill) throw new NotFoundException("Skill doesn't exist");
        return skill
    }
    async create(body: CreateSkillDto){
        const skills = await this.getAll();
        const newSkill: SkillsDto = {
            id: uuid(),
            ...body,
        }
        skills.push(newSkill);
        await this.saveSkills(skills)
    }
    async delete(id: string){
        const skills = await this.getAll();
        const filteredSkills = skills.filter(skills => skills.id === id);
        if(skills.length === filteredSkills.length) throw new NotFoundException("Skill doesn't exist");
        await this.saveSkills(filteredSkills);
    }
    async update(id: string, body: UpdateSkillsDto){
        const skills = await this.getAll();
        const foundSkill = skills.find(skill => skill.id === id);
        if(!foundSkill) throw new NotFoundException("Skill doesn't exist");
        const updatedSkills = skills.map(skills => skills.id === id ? {...skills,...body} : skills);
        await this.saveSkills(updatedSkills);
    }
}
