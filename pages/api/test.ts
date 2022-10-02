import { NextApiRequest, NextApiResponse } from "next";

type Response = {
    success: boolean,
    message: string
}

export default async function test(req:NextApiRequest, res:NextApiResponse<Response>) {

res.send({success: true, message: 'it is working'})

}