import { MaxLength, MinLength } from 'class-validator';
import { roleEnum } from 'src/auth/enums/role-enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    unique: true,
    type: 'varchar'
  })
  email: string;
  @Column({
    default: roleEnum.USER
  })
  role: roleEnum;
  @Column({
    name: 'first_name',
    type: "varchar"
  })
  @MinLength(3)
  @MaxLength(30)
  firstName: string;
  @Column({
    name: 'last_name',
    type: "varchar"
  })
  @MinLength(3)
  @MaxLength(30)
  lastName: string;
  @Column({
    type: 'varchar'
  })
  password: string;
  @Column({
    type: 'int',
  })
  age: number;
  @Column('text', {
    array: true,
    default: [],
    nullable: true,
  })
  refreshTokens: string[];
  
}
