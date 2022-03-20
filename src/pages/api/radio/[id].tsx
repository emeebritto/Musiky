import type { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io'
import cache from "memory-cache";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  /*if (!res.socket.server.io) {
    console.log('*First use, starting socket.io')

    const io = new Server(res.socket.server)

    io.on('connection', socket => {
      socket.broadcast.emit('a user connected')
      socket.on('hello', msg => {
        socket.emit('hello', 'world!')
      })
    })

    res.socket.server.io = io
  } else {
    console.log('socket.io already running')
  }
  res.end()*/
  res.json({msg: 'Unavailable'});
}

export const config = {
  api: {
    bodyParser: false
  }
}
