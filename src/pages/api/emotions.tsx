import type { NextApiRequest, NextApiResponse } from 'next'
import { Music } from 'common/types';
import istatic from 'services/istatic';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const random = String(req.query.random || 0);
  const id = String(req.query.id || '');
  const maxResult = String(req.query.maxResult || 10);

  let emotions = await istatic.emotions({ random, maxResult }).then(r => r.data);
  if (id) {
    const firstEmotion = await istatic.emotions({ id })
      .then(r => r.data)
      .catch(err => console.error(err));
    if (firstEmotion) {
      emotions = [...firstEmotion, ...emotions];      
    }
  };
  for (let i=0; i < emotions.length; i++) {
    let emotion = emotions[i];
    let resComments = await istatic.commentsTread({ id: emotion.id })
      .then(r => r.data)
    emotion['comments'] = {
      list: resComments.comments.length ? resComments.comments : null,
      continuation: resComments.continuation || null
    };
  }

  res.status(200).json(emotions);
}
