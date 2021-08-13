import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class PerpSequenceNumber {
  @Column()
  address: string;

  @Column()
  seqNum: number;

  @PrimaryColumn('timestamptz')
  loadTimestamp: string;
}
