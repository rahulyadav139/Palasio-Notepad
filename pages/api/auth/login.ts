import { NextApiResponse, NextApiRequest } from 'next';
import { mongoConnect, genHash, genJwtToken } from 'utils';
import { User } from 'models';
import cookie from 'cookie';

export default async function LoginUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .send({ success: false, message: `${req.method} is not allowed` });
  }

  const { email, password } = req.body;

  try {
    await mongoConnect();

    const user = await User.findOne({ email: email });

    const hashed = genHash(user.salt, password);

    const isMatched = hashed === user.password;

    if (!isMatched) {
      res.status(401).send({ success: false, message: 'unauthorized' });
    }

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

    res
      .status(200)
      .send({ success: true, message: 'successfully login', token });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: 'something went wrong' });
  }
}
