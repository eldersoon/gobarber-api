import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

/**
 * Controllers imports
 */
import UserController from './app/controllers/UserController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import SessionController from './app/controllers/SessionController';
import ScheduleController from './app/controllers/ScheduleController';
import FileController from './app/controllers/FileController';
import NotificationController from './app/controllers/NotificationController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import AvailableController from './app/controllers/AvailableController'


const routes = new Router();
const upload = multer(multerConfig);

/**
 * Sessions
 */
routes.post('/sessions', SessionController.store);

/**
 * Routes for Users
 */
routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users', UserController.update);
routes.get('/appointments', AppointmentController.index);

/**
 * Providers
 */
routes.get('/providers', ProviderController.index);
routes.get('/schedules', ScheduleController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

/**
 * Appointments
 */
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

/**
 * Notifications
 */
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

/**
 * Upload file
 */
routes.post('/files', upload.single('file'), FileController.store);


export default routes;
