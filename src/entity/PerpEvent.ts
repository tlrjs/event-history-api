import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class PerpEvent {
  @PrimaryColumn('timestamptz')
  loadTimestamp: string;

  @Column()
  address: string;

  @Column()
  seqNum: number;

  @Column()
  makerFee: number;

  @Column()
  takerFee: number;

  @Column()
  takerSide: string;

  @Column()
  maker: string;

  @Column()
  makerOrderId: string;

  @Column()
  taker: string;

  @Column()
  takerOrderId: number;

  @Column()
  price: number;

  @Column()
  quantity: number;
}
