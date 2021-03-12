import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import Owner from './Owner';

@Entity()
export default class Event {
  @PrimaryGeneratedColumn()
  id: string;

  @PrimaryColumn('timestamptz')
  loadTimestamp: string;

  @Column()
  address: string;

  @Column()
  programId: string;

  @Column()
  baseCurrency: string;

  @Column()
  quoteCurrency: string;

  @Column()
  fill: boolean;

  @Column()
  out: boolean;

  @Column()
  bid: boolean;

  @Column()
  maker: boolean;

  @Column()
  openOrderSlot: string;

  @Column()
  feeTier: string;

  @Column()
  nativeQuantityReleased: string;

  @Column()
  nativeQuantityPaid: string;

  @Column()
  nativeFeeOrRebate: string;

  @Column()
  orderId: string;

  @Column()
  openOrders: string;

  @Column()
  clientOrderId: string;

  @ManyToOne(() => Owner)
  @JoinColumn({ name: 'openOrders' })
  owner: Owner;
}
