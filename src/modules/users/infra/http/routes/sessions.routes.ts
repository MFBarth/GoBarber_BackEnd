import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionController = new SessionsController();

// Rota: Receber a requisição, chamar outro aquivo para tratar a requisição, devolver uma resposta.

sessionsRouter.post('/', sessionController.create);

export default sessionsRouter;
