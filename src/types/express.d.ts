import { UserPayload } from '../utils/jwt.ts';

export interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export { }; // Esto es necesario para que TS lo trate como un módulo