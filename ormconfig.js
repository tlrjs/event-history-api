require('dotenv').config();

module.exports = {
  type: 'postgres',
  url: process.env.TRADE_HISTORY_DB_URL,
  synchronize: false,
  logging: false,
  entities: ['dist/entity/**/*.js'],
  migrations: ['dist/migration/**/*.js'],
  subscribers: ['dist/subscriber/**/*.js'],
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
