import { Request, Response } from 'express';
import sleep from '../helpers/sleep';

const allCategories = async function (req: Request, res: Response) {
  try {
    const categories = [
      { title: 'Processor', icon: 'http://localhost:10000/categories/proc.svg' },
      { title: 'Motherboard', icon: 'http://localhost:10000/categories/motherboard.svg' },
      { title: 'ORM', icon: 'http://localhost:10000/categories/orm.svg' },
      { title: 'Power', icon: 'http://localhost:10000/categories/power.svg' },
      { title: 'Graphic card', icon: 'http://localhost:10000/categories/grapfic-card.svg' },
    ];
    await sleep(500);

    res.status(200).send(categories);
  } catch (err) {
    console.error(err);
  }
};


export default { allCategories };
