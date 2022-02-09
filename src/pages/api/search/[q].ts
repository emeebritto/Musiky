import type { NextApiRequest, NextApiResponse } from 'next'
import search from 'common/utils/search/search';
 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const result = await search({ input: req.query.input });
  res.status(200).json(result);
}
