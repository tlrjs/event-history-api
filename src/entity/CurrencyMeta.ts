import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class CurrencyMeta {
  @PrimaryColumn('text')
  address: string;

  @PrimaryColumn('text')
  programId: string;

  @PrimaryColumn('text')
  currency: string;

  @Column()
  MintDecimals: number;
}
