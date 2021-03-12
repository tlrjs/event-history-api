require('dotenv').config();

const typeOrmPaths = (dir) => {
  return process.env.NODE_ENV === 'production' ? `dist/${dir}/**/*.js` : `src/${dir}/**/*.ts`;
};

module.exports = {
  type: 'postgres',
  url: process.env.TRADE_HISTORY_DB_URL,
  synchronize: false,
  logging: false,
  entities: [typeOrmPaths('entity')],
  migrations: [typeOrmPaths('migration')],
  subscribers: [typeOrmPaths('subscriber')],
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
