import { NextApiResponse, NextApiRequest } from "next";

export default async function LoginUser(req: NextApiRequest, res: NextApiResponse) {

    if(req.method !== 'POST') {
        return res.status(405).send({success: false, message: `${req.method} is not allowed`})
    }

    res.status(200).send({success: true, message: 'api is working fine!'})

}