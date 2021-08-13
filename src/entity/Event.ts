import { Entity, Column, Index, PrimaryColumn } from 'typeorm';

@Entity()
export default class Event {
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

  @Column()
  uuid: string;

  @Column()
  source: number;

  @Column()
  seqNum: number;
}
