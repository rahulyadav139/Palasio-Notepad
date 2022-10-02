import { User } from 'models';
import { NextApiRequest, NextApiResponse } from 'next';
import { mongoConnect, genHash, genJwtToken } from 'utils';
import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';
import cookie from 'cookie';

declare const process: {
  env: {
    JWT_SECRET: string;
  };
};

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res
      .status(403)
      .send({ success: false, message: `${req.method} is not allowed` });
  }

  try {
    const { password, ...payload } = req.body;

    await mongoConnect();

    const salt = crypto.randomBytes(32).toString('hex');
    // const hashedPassword = crypto
    //   .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    //   .toString('hex');

    const hashedPassword = genHash(salt, password);

    const user = new User({ ...payload, salt, password: hashedPassword });

    await user.save();

    const secret = process.env.JWT_SECRET;

    // const token = jsonwebtoken.sign({ sub: user._id }, secret, {
    //   expiresIn: '7d',
    // });

    const token = genJwtToken({ sub: user._id });

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', String(token), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict',
        path: '/',
      })
    );

    res.status(200).send({
      success: true,
      message: 'user created',
      token: `Bearer ${token}`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: true, message: 'something went wrong' });
  }
}
