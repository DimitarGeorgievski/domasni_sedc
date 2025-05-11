import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { roomType } from '../entities/room.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoomDto {
  @IsOptional()
  @IsEnum(roomType)
  @ApiProperty({
    description: 'the type of hotel room',
    example: 'SINGLE | DOUBLE | SUITE | DELUXE',
    minLength: 3,
    maxLength: 3,
  })
  type: roomType;
  @IsOptional()
  @IsNumber()
  @Min(50)
  @Max(1000)
  @ApiProperty({
    description: 'the price of the hotel room',
    example: 190,
    minimum: 50,
    maximum: 1000,
  })
  price: number;
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'check if the room is aviable for rent',
    example: true,
  })
  isAvailable: boolean;
  @IsOptional()
  @IsArray()
  @IsString({each: true})
  @ArrayNotEmpty()
  @ApiProperty({
    description: 'bonus stuff that each room contains',
    example: ["Wifi", "Tv"],
  })
  amenities: string[];
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  @ApiProperty({
    description: 'How much people can a room fit',
    example: 3,
    minimum: 1,
    maximum: 5,
  })
  maxOccupancy: number;
  @IsOptional()
  @IsDate()
  @ApiProperty({
    description: 'when was the room last time cleaned, date',
    example: "2023-01-01 23:24:23",
  })
  lastCleaned: Date;
  @IsOptional()
  @IsString()
  @Length(3,100)
  @ApiProperty({
    description: 'updates or fixes that should be done to that room',
    example: "new tv,broken kitchen",
  })
  maintenanceNotes: string;
}
