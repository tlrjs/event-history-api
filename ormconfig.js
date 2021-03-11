require('dotenv').config();

module.exports = {
  type: 'postgres',
  url: process.env.TRADE_HISTORY_DB_URL,
  synchronize: false,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
