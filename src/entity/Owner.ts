import { Entity, PrimaryColumn, Column } from 'typeorm';
@Entity()
export default class Owner {
  @PrimaryColumn()
  openOrders: string;

  @Column()
  owner: string;
}
