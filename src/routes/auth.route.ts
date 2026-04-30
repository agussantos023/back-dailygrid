import { Router } from 'express';
import { googleLogin, refreshToken, logout } from '../controllers/auth.controller.ts';
import { isAuth } from '../middlewares/auth.middleware.ts';

const routerAuth = Router();

routerAuth.post('/google', googleLogin);
routerAuth.post('/refresh', refreshToken);
routerAuth.post('/logout', isAuth, logout);

export default routerAuth;