import dotenv from 'dotenv';
dotenv.config();
import express, { Request } from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { fetchTrades } from './fetchTrades';

createConnection().then(async (db) => {
  console.log('connected');

  const app = express();
  app.use(express.json(), cors());

  app.get('/trades/:ownerAddress', async (req, res) => {
    try {
      const ownerAddress = req.params.ownerAddress as string;
      const page = req.query.page as string;
      const results = await fetchTrades(ownerAddress, page);

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
