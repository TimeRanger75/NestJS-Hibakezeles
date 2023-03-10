/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export default class User {
  @PrimaryGeneratedColumn() id: number;
  @Column() email: string;
  @Column() password: string;
  @Column() profilePicture: string;
  @Column() registrationDate: Date;
}
