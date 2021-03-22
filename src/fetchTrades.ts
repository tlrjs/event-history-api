import 'reflect-metadata';
import { getRepository } from 'typeorm';
import { CurrencyMeta, SerumEvent, Owner } from './entity';
import { parseFillEvent } from './utils';

const fetchTradesByOwner = async (walletAddress: string, page: string) => {
  const perPage: number = 200;
  const offSet = parseInt(page) ? (parseInt(page) - 1) * perPage : 0;
  const eventRepo = getRepository(SerumEvent);
  const currencyMetaRepo = getRepository(CurrencyMeta);

  const results = await eventRepo
    .createQueryBuilder('event')
    .innerJoinAndSelect(
      Owner,
      'owner',
      'owner.openOrders = event.openOrders AND owner.owner = :walletAddress',
      {
        walletAddress,
      }
    )
    .distinctOn(['event.uuid'])
    .skip(offSet)
    .take(perPage)
    .getMany();

  if (results.length === 0) return;

  const uniqCurrencies = [...new Set(results.map((e) => [e.baseCurrency, e.quoteCurrency]).flat())];
  const currencyMeta = await currencyMetaRepo
    .createQueryBuilder('currency_meta')
    .where('currency_meta.currency IN (:...currencies)', { currencies: uniqCurrencies })
    .distinctOn(['currency_meta.currency'])
    .getMany();

  return results.map((event) => parseFillEvent(event, currencyMeta));
};

const fetchTradesByOpenOrders = async (address: string, page: string) => {
  const perPage: number = 100;
  const offSet = parseInt(page) ? (parseInt(page) - 1) * perPage : 0;
  const eventRepo = getRepository(SerumEvent);
  const currencyMetaRepo = getRepository(CurrencyMeta);

  const results = await eventRepo
    .createQueryBuilder('event')
    .where('event.openOrders = :address', { address })
    .distinctOn(['event.uuid'])
    .skip(offSet)
    .take(perPage)
    .getMany();

  if (results.length === 0) return [];

  const uniqCurrencies = [...new Set(results.map((e) => [e.baseCurrency, e.quoteCurrency]).flat())];
  const currencyMeta = await currencyMetaRepo
    .createQueryBuilder('currency_meta')
    .where('currency_meta.currency IN (:...currencies)', { currencies: uniqCurrencies })
    .distinctOn(['currency_meta.currency'])
    .getMany();

  return results.map((event) => parseFillEvent(event, currencyMeta));
};

export { fetchTradesByOwner, fetchTradesByOpenOrders };
