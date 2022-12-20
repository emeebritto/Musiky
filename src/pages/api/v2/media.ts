import type { NextApiRequest, NextApiResponse } from 'next'
import faker from 'faker';
import axios from 'axios';


const formatUrl = (str:string):string => {
  if (str.includes("http")) return str
  return `https://www.youtube.com/watch?v=${str}`
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchReturn>
) {

  const id = String(req.query?.id || '');
  if (!id) return res.status(404).json({ msg: "id is required!" })
  console.log({ id });
  try {
    const result = await axios({
        url: process.env.NXT_URL,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({
          "fn_index": 0,
          "data": [`exec::dlmusicyt::url::${formatUrl(id)}`]
        })
      }).then(r => r.data)
    const mediaUrl = result.data[0][0].msg
    res.status(200).json({ url: mediaUrl })
  } catch(e) {
    console.log({ err: e });
    res.status(404).json({ url: "" });
  }
}
