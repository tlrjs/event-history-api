import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class SequenceNumber {
  @Column()
  address: string;

  @Column()
  seqNum: number;

  @PrimaryColumn('timestamptz')
  loadTimestamp: string;
}
