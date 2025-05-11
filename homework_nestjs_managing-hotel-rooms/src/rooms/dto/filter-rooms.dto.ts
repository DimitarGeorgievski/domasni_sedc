import { ApiProperty, ApiPropertyOptional, ApiQuery } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { roomType } from '../entities/room.entity';

export class FilterRoomsDto {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Query paramter for finding room by its number',
    example: 12,
    minimum: 1,
    maximum: 999,
  })
  roomNumber?: number;
  @IsOptional()
  @IsEnum(roomType)
  @ApiPropertyOptional({
    description: 'the type of the hotel room',
    example: 'SINGLE | DOUBLE | SUITE | DELUXE',
    minLength: 3,
    maxLength: 3,
  })
  type?: roomType;
  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiPropertyOptional({
    description: 'Minimum price',
    example: 100,
  })
  minPrice?: number;
  @IsOptional()
  @IsNumber()
  @Max(1000)
  @ApiPropertyOptional({
    description: 'Maximum price',
    example: 500,
  })
  maxPrice?: number;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'check if the room is available for rent',
    example: true,
  })
  isAvailable?: boolean; // znam deka mora da e boolean ama i taka naprajv ama ne mi rabotese filtero na toj nacin
}
