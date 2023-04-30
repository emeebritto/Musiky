import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  token:string|undefined;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ token: process.env.STREAM_SIGN })
}
