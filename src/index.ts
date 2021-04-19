import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { fetchTradesByOwner, fetchTradesByOpenOrders } from './fetchTrades';

const rateLimit = require('express-rate-limit');

createConnection().then(async (db) => {
  const app = express();

  const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 60, // limit each IP to 60 requests per windowMs
  });

  //  apply to all requests
  app.use(limiter);
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

  app.listen(process.env.PORT, () =>
    console.log(`Server listening at http://localhost:${process.env.PORT}`)
  );
});
