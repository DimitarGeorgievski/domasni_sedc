import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum roomType {
  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE',
  SUITE = 'SUITE',
  DELUXE = 'DELUXE',
}

@Entity()
export class Room {
    @PrimaryColumn({ unique: true })
    @ApiProperty({
      description: 'the number of the hotel room',
      example: 1,
      minimum: 1,
      maximum: 999
    })
  roomNumber: number;
  
  @Column({
    type: 'enum',
    enum: roomType,
    default: roomType.SINGLE,
  })
  @ApiProperty({
    description: 'the type of the hotel room',
    example: 'SINGLE | DOUBLE | SUITE | DELUXE',
  })
  type: roomType;
  @Column()
  @ApiProperty({
    description: 'the price of the hotel room',
    example: 59,
    minimum: 50,
    maximum: 1000
  })
  price: number;
  @Column({
    type: 'boolean',
    default: true,
  })
  @ApiProperty({
    description: 'check if the room is aviable for rent',
    example: true,
  })
  isAvailable: boolean;
  @Column({
    type: "text",
    array: true,
    default: ["Wifi"],
  })
  @ApiProperty({
    description: 'bonus stuff that contains each room',
    example: ['WiFi', 'TV', 'Air Conditioning'],
  })
  amenities: string[];
  @Column({
    type: "int",
    default: 1
  })
  @ApiProperty({
    description: 'how much people can fit one room',
    example: 2,
  })
  maxOccupancy: number;
  @Column({
    type: "timestamp without time zone",
    nullable: false,
  })
  @ApiProperty({
    description: 'the last date that room has been cleaned',
    example: "2011-01-01 00:00:00",
  })
  lastCleaned: Date;
  @Column({
    type: "text",
    nullable: true,
  })
  @ApiProperty({
    description: 'note about what should be fixed/added to the room',
    example: "new tv",
  })
  maintenanceNotes?: string;
}
