import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import * as Sentry from '@sentry/node';
import { createConnection } from 'typeorm';
import { fetchTradesByOwner, fetchTradesByOpenOrders } from './fetchTrades';

Sentry.init({
  dsn: 'https://68333cb984fc43caa598b6a86da05f01@o568322.ingest.sentry.io/5713285',
});

createConnection().then(async (db) => {
  const app = express();

  app.use(Sentry.Handlers.requestHandler());
  app.use(express.json(), cors());

  app.get('/trades/owner/:ownerAddress', async (req, res) => {
    try {
      const ownerAddress = req.params.ownerAddress as string;
      const page = req.query.page as string;
      const results = await fetchTradesByOwner(ownerAddress, page);

      res.send({ success: true, data: results });
    } catch (error) {
      console.error({ req, error });

      res.status(500).send({ message: 'error', error });
    }
  });

  app.get('/trades/open_orders/:openOrders', async (req, res) => {
    try {
      const openOrders = req.params.openOrders as string;
      const page = req.query.page as string;
      const results = await fetchTradesByOpenOrders(openOrders, page);

      res.send({ success: true, data: results });
    } catch (error) {
      console.error({ req, error });

      res.status(500).send({ message: 'error', error });
    }
  });

  app.use(Sentry.Handlers.errorHandler());

  app.listen(process.env.PORT, () =>
    console.log(`Server listening at http://localhost:${process.env.PORT}`)
  );
});
