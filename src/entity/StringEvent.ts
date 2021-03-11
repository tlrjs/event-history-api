import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class StringEvent {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  address: string;

  @Column()
  programId: string;

  @Column()
  raw_event: string;

  @PrimaryColumn('timestamp')
  loadTimestamp: string;
}
