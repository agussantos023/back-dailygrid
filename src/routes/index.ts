import { Router } from "express";
import routerAuth from "./auth.route";

const router = Router()

router.get('/health', (req, res) => {
  res.send({
    status: 'OK',
    timestamp: new Date()
  });
});

router.use('/auth', routerAuth)


export default router;