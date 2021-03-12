import BN from 'bn.js';

const tokenMultiplier = (tokenMintDecimals) => {
  return new BN(10).pow(new BN(tokenMintDecimals));
};

const divideBnToNumber = (numerator: BN, denominator: BN): number => {
  const quotient = numerator.div(denominator).toNumber();
  const rem = numerator.umod(denominator);
  const gcd = rem.gcd(denominator);
  return quotient + rem.div(gcd).toNumber() / denominator.div(gcd).toNumber();
};

export const parseFillEvent = (event, currencyMeta) => {
  event.baseTokenDecimals = currencyMeta.find(
    (c) => c.currency === event.baseCurrency
  ).MintDecimals;
  event.quoteTokenDecimals = currencyMeta.find(
    (c) => c.currency === event.baseCurrency
  ).MintDecimals;

  const nativeQuantityPaid = new BN(event.nativeQuantityPaid);
  const nativeQuantityReleased = new BN(event.nativeQuantityReleased);
  const nativeFeeOrRebate = new BN(event.nativeFeeOrRebate);

  let size, price, side, priceBeforeFees;

  if (event.bid) {
    side = 'buy';
    priceBeforeFees = event.maker
      ? nativeQuantityPaid.add(nativeFeeOrRebate)
      : nativeQuantityPaid.sub(nativeFeeOrRebate);
    price = divideBnToNumber(
      priceBeforeFees.mul(tokenMultiplier(event.baseTokenDecimals)),
      tokenMultiplier(event.quoteTokenDecimals).mul(nativeQuantityReleased)
    );
    size = divideBnToNumber(nativeQuantityReleased, tokenMultiplier(event.baseTokenDecimals));
  } else {
    side = 'sell';
    priceBeforeFees = event.maker
      ? nativeQuantityReleased.sub(nativeFeeOrRebate)
      : nativeQuantityReleased.add(nativeFeeOrRebate);
    price = divideBnToNumber(
      priceBeforeFees.mul(tokenMultiplier(event.baseTokenDecimals)),
      tokenMultiplier(event.quoteTokenDecimals).mul(nativeQuantityPaid)
    );
    size = divideBnToNumber(nativeQuantityPaid, tokenMultiplier(event.baseTokenDecimals));
  }
  return {
    ...event,
    side,
    price,
    feeCost:
      divideBnToNumber(nativeFeeOrRebate, tokenMultiplier(event.quoteTokenDecimals)) *
      (event.maker ? -1 : 1),
    size,
  };
};
