export const config = {
  supportedCurrencies: [
    {
      id: 1,
      ticker: 'BTC',
    },
    {
      id: 2,
      ticker: 'ETH',
    },
    {
      id: 3,
      ticker: 'ADA',
    },
    {
      id: 4,
      ticker: 'LTC',
    },
  ],
  usdTicker: 'usd',
  sdk: {
    coingecko: {
      baseUrl: 'https://api.coingecko.com/api/v3',
    },
    coincap: {
      baseUrl: 'http://api.coincap.io/v2',
    },
  },
};
