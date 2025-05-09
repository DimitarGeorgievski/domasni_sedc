import { Injectable, NotFoundException } from '@nestjs/common';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { PlayerDto } from './dtos/player.dtos';
import { CreatePlayerDto } from './dtos/create-player.dtos';
import { v4 as uuid } from 'uuid';
import { UpdatePlayerDto } from './dtos/update-player.dtos';

@Injectable()
export class PlayersService {
  private PLAYERS_PATH = join(process.cwd(), 'data', 'players.json');

  async findAll() {
    const playersJSON = await readFile(this.PLAYERS_PATH, 'utf-8');

    const players = JSON.parse(playersJSON) as PlayerDto[];

    return players;
  }
  async getById(id: string){
    const players = await this.findAll();
    const player = players.find(player => player.id === id);
    if(!player) throw new NotFoundException("Player doesn't exist");
    return player;
  }
  async save(players: PlayerDto[]) {
    await writeFile(this.PLAYERS_PATH, JSON.stringify(players, null, 2));
  }

  async create(playerData: CreatePlayerDto) {
    const players = await this.findAll();

    const newPlayer: PlayerDto = {
      id: uuid(),
      skills: [],
      experience: 0,
      ...playerData,
    };

    players.push(newPlayer);

    await this.save(players);
  }
  async update(id: string, body: UpdatePlayerDto){
    const players = await this.findAll();
    const foundPlayer = players.find(player => player.id === id);
    if(!foundPlayer) throw new NotFoundException("Player doesn't exist");
    const updatedPlayers = players.map(player => player.id === id ? {...player,...body} : player);
    await this.save(updatedPlayers);
  }
  async delete(id: string){
    const players = await this.findAll();
    const player = players.filter(player => player.id !== id);
    if(players.length === player.length) throw new NotFoundException("Player doesn't exist");
    await this.save(player);
  }
  async addSkill(skillId: string, playerId: string){
    
  }
}