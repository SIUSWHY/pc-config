import { Router } from 'express';
import Category from './Category';
import Health from './Health';

const routes = Router();

routes.use('/category', Category);
routes.use('/', Health);

export default routes;
