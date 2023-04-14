import { Router } from 'express';
import Categories from '../controller/Categories';

const categoryRoutes = Router();

categoryRoutes.get('/', Categories.allCategories);

export default categoryRoutes;
