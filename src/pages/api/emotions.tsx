import type { NextApiRequest, NextApiResponse } from 'next'
import { Music } from 'common/types';
import axios from 'axios';
import { IstaticBaseUrl } from 'api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const random = req.query.random || 0;
  const id = req.query.id;
  const maxResult = req.query.maxResult || 10;

  let firstEmotion: Music | null = null;
  const URL = `${IstaticBaseUrl}emotions?random=${random}&maxResult=${maxResult}`;
  let emotions = await axios.get(URL).then(r => r.data);
  if (id && id != 'undefined') {
    firstEmotion = await axios.get(`${IstaticBaseUrl}emotions?id=${id}`)
      .then(r => r.data)
      .catch(err => console.error(err));
    emotions = [firstEmotion, ...emotions];
  };
  for (let i=0; i < emotions.length; i++) {
    let emotion = emotions[i];
    let resComments = await axios.get(`${IstaticBaseUrl}comments?id=${emotion.id}`)
      .then(r=>r.data)
    emotion['comments'] = {
      list: resComments.comments.length ? resComments.comments : null,
      continuation: resComments.continuation || null
    };
  }

  res.status(200).json(emotions);
}
