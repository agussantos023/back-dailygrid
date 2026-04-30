import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const generateTokens = (user: any) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    ACCESS_SECRET,
    { expiresIn: '2h' }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    REFRESH_SECRET,
    { expiresIn: '180d' }
  );

  return { accessToken, refreshToken };
};

export const verifyToken = (token: string, secret: 'access' | 'refresh') => jwt.verify(token, secret === 'access' ? ACCESS_SECRET : REFRESH_SECRET);

