import { Router } from 'express';
import Category from './Categories';
import Products from './Products';
import Health from './Health';

const routes = Router();

routes.use('/categories', Category);
routes.use('/products', Products);
routes.use('/', Health);

export default routes;
