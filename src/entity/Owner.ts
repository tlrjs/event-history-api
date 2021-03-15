import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import SerumEvent from './Event';
@Entity()
export default class Owner {
  @PrimaryColumn()
  openOrders: string;

  @Column()
  owner: string;
}
