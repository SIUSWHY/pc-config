import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import puppeteer from 'puppeteer';
import DnsShopScrapper from './helpers/DNS_Scrapper';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import additionalRoutes from './routes/index';

function start() {
  const app: Application = express();
  const port = 10000;

  const httpServer = createServer(app);

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/', express.static(__dirname + '/static'));

  app.use(additionalRoutes);

  httpServer.listen(port, () =>
    console.log(`🔥: Example app listening on port ${port}!
  `)
  );

  // (async () => {
  //   const browser = await puppeteer.launch({ headless: false });
  //   const page = await browser.newPage();

  //   await DnsShopScrapper(page);

  //   await browser.close();
  // })();
}
start();
