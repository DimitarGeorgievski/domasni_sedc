import { roleEnum } from 'src/auth/enums/role-enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    unique: true,
  })
  email: string;
  @Column()
  password: string;
  @Column({
    name: 'first_name',
  })
  firstName: string;
  @Column({
    name: 'last_name',
  })
  lastName: string;
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
  @Column({
    default: roleEnum.user
  })
  role: roleEnum;
}
