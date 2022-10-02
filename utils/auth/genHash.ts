import crypto from 'crypto';

export const genHash = (salt: string, password: string): string => {
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return hashedPassword;
};
