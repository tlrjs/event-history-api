import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class PerpLiquidationEvent {
  @PrimaryColumn('timestamptz')
  loadTimestamp: string;

  @Column()
  address: string;

  @Column()
  liqee: string;

  @Column()
  liqor: string;

  @Column()
  liquidationFee: number;

  @Column()
  seqNum: number;

  @Column()
  price: number;

  @Column()
  quantity: number;
}
