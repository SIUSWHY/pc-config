import { Request, Response } from 'express';
import dnsProcessorsData from '../mocks/dns/cpu/2.json';
import dnsMotherboardData from '../mocks/dns/motherboard/2.json';
import dnsORMData from '../mocks/dns/orm/2.json';
import dnsGraphicsCardData from '../mocks/dns/graphic-card/2.json';
import dnsEnergyBlockData from '../mocks/dns/energy-block/2.json';
import sleep from '../helpers/sleep';

const getItemsByCategory = async function (req: Request, res: Response) {
  const category = req.query.category;

  try {
    switch (category) {
      case 'processor':
        await sleep(1000);

        res.status(200).send(dnsProcessorsData);
        break;

      case 'motherboard':
        await sleep(1000);

        res.status(200).send(dnsMotherboardData);
        break;

      case 'orm':
        await sleep(1000);

        res.status(200).send(dnsORMData);
        break;

      case 'graphic card':
        await sleep(1000);

        res.status(200).send(dnsGraphicsCardData);
        break;

      case 'power':
        await sleep(1000);

        res.status(200).send(dnsEnergyBlockData);
        break;
    }
  } catch (err) {
    console.error(err);
  }
};

export default { getItemsByCategory };
