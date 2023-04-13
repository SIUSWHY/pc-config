import { Router } from 'express';
import Category from '../controller/Category';

const categoryRoutes = Router();

categoryRoutes.get('/', Category.allCategories);

export default categoryRoutes;
