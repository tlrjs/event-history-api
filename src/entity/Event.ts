import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import Owner from './Owner';

@Entity()
// @Index(['address', 'openOrders', 'programId'])
export default class Event {
  @PrimaryGeneratedColumn()
  id: string;

  @PrimaryColumn('timestamp')
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
