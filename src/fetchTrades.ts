import 'reflect-metadata';
import { getRepository } from 'typeorm';
import { SerumEvent, Owner } from './entity';

const fetchTrades = async (walletAddress: string, page: string) => {
  const perPage: number = 20;
  const offSet = parseInt(page) ? (parseInt(page) - 1) * perPage : 0;
  const eventRepo = getRepository(SerumEvent);

  return await eventRepo
    .createQueryBuilder('event')
    .innerJoinAndSelect(
      Owner,
      'owner',
      'owner.openOrders = event.openOrders AND owner.owner = :walletAddress',
      { walletAddress }
    )
    .where('event.fill = TRUE')
    .skip(offSet)
    .take(20)
    .getMany();
};

export { fetchTrades };
