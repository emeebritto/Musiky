import type { NextApiRequest, NextApiResponse } from 'next'
import { Music } from 'common/types';
import axios from 'axios';
import istatic from 'services/istatic';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const random = req.query.random || 0;
  const id = req.query.id;
  const maxResult = req.query.maxResult || 10;

  const params = `random=${random}&maxResult=${maxResult}`;
  let emotions = await istatic.emotions(params).then(r => r.data);
  if (id && id != 'undefined') {
    const firstEmotion = await istatic.emotions(`id=${id}`)
      .then(r => r.data)
      .catch(err => console.error(err));
    if (firstEmotion) {
      emotions = [...firstEmotion, ...emotions];      
    }
  };
  for (let i=0; i < emotions.length; i++) {
    let emotion = emotions[i];
    let resComments = await istatic.commentsTread({ mediaId: emotion.id })
      .then(r => r.data)
    emotion['comments'] = {
      list: resComments.comments.length ? resComments.comments : null,
      continuation: resComments.continuation || null
    };
  }

  res.status(200).json(emotions);
}
