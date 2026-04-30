import { Router } from "express";
import routerAuth from "./auth.route";
import { isAuth } from "../middlewares/auth.middleware";
import routerUser from "./user.route";

const router = Router()

router.get('/health', (req, res) => {
  res.send({
    status: 'OK',
    timestamp: new Date()
  });
});

router.use('/auth', routerAuth)

router.use('/user', isAuth, routerUser)


export default router;