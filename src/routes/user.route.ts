import { Router } from 'express';
import { checkUsername, updateProfile } from '../controllers/user.controller.ts';

const routerUser = Router();

routerUser.patch('/me', updateProfile);
routerUser.get('/check/:username', checkUsername);

export default routerUser;