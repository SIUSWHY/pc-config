import { Router } from 'express';
import Health from '../controller/Health';

const healthRoutes = Router();

healthRoutes.get('/', Health.sendStatus);

export default healthRoutes;
