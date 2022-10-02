import jsonwebtoken from 'jsonwebtoken';

export const genJwtToken = (payload: object[]): string => {
  const secret = process.env.JWT_SECRET!;

  const token = jsonwebtoken.sign(payload, secret, {
    expiresIn: '7d',
  });

  return `Bearer ${token}`;
};
