import { ArrayNotEmpty, IsArray, IsBoolean, IsDate, IsEnum, IsNumber, IsString, Length, Max, Min } from "class-validator";
import { roomType } from "../entities/room.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoomDto {
    @IsNumber()
    @Min(1)
    @Max(999)
    @ApiProperty({
      description: 'the number of the hotel room',
      example: 1,
      minimum: 1,
      maximum: 999
    })
    roomNumber: number;
    @IsEnum(roomType)
    @ApiProperty({
    description: 'the type of the hotel room',
    example: 'SINGLE | DOUBLE | SUITE | DELUXE',
    minLength: 3,
    maxLength: 3,
  })
    type: roomType;
    @IsNumber()
    @Min(50)
    @Max(1000)
    @ApiProperty({
    description: 'the price of the hotel room',
    example: 50,
    minimum: 50,
    maximum: 1000
  })
    price: number;
    @IsBoolean()
    @ApiProperty({
        description: 'check if the room is aviable for rent',
        example: true,
      })
    isAvailable: boolean;
      @IsArray()
      @IsString({each: true})
      @ArrayNotEmpty()
      @ApiProperty({
        description: 'bonus stuff that each room contains',
        example: ["Wifi", "Tv"],
      })
      amenities: string[];
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
      @IsDate()
      @ApiProperty({
        description: 'when was the room last time cleaned, date',
        example: "2023-01-01 23:24:23",
      })
      lastCleaned: Date;
      @IsString()
      @Length(3,100)
      @ApiProperty({
        description: 'updates or fixes that should be done to that room',
        example: "new tv,broken kitchen",
      })
      maintenanceNotes?: string;
}