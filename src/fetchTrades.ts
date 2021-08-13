import 'reflect-metadata';
import { getRepository } from 'typeorm';
import { CurrencyMeta, SerumEvent, Owner, PerpEvent, PerpLiquidationEvent } from './entity';
import { parseFillEvent } from './utils';

export const fetchPerpTradesByOwner = async (address: string) => {
  const fillEvents = await getRepository(PerpEvent)
    .createQueryBuilder()
    .where('perp_event.maker = :address', { address })
    .orWhere('perp_event.taker = :address', { address })
    .getMany();

  const liquidateEvents = await getRepository(PerpLiquidationEvent)
    .createQueryBuilder()
    .where('perp_liquidation_event.liqee = :address', { address })
    .orWhere('perp_liquidation_event.liqor = :address', { address })
    .getMany();

  return [...fillEvents, liquidateEvents];
};

export const fetchTradesByOpenOrders = async (address: string, page: string) => {
  const perPage: number = 100;
  const offSet = parseInt(page) ? (parseInt(page) - 1) * perPage : 0;

  const results = await getRepository(SerumEvent)
    .createQueryBuilder('event')
    .where('event.openOrders = :address', { address })
    .distinctOn(['event.uuid'])
    .skip(offSet)
    .take(perPage)
    .getMany();

  if (results.length === 0) return [];

  const uniqCurrencies = [...new Set(results.map((e) => [e.baseCurrency, e.quoteCurrency]).flat())];
  const currencyMeta = await getRepository(CurrencyMeta)
    .createQueryBuilder('currency_meta')
    .where('currency_meta.currency IN (:...currencies)', { currencies: uniqCurrencies })
    .distinctOn(['currency_meta.currency'])
    .getMany();

  return results.map((event) => parseFillEvent(event, currencyMeta));
};
