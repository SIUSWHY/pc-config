import { Router } from 'express';
import Products from '../controller/Products';

const productsRoutes = Router();

productsRoutes.get('/', Products.getItemsByCategory);

export default productsRoutes;
