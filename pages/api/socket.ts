import { Server } from 'socket.io';

const ioHandler = (req, res) => {
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server);

        io.on('connection', (socket: SocketIO.Socket) => {
            socket.join('auth');
            console.log(socket.client.conn.id);
            socket.on('login', (auth) => {
                const room = auth.name;
                socket.join(room);
                socket.on('message-' + room, (msg) => {
                    io.to(room).emit('message', msg);
                });
                io.to('auth').emit('auth', auth.id);
                socket.leave('auth');
            });
        });

        res.socket.server.io = io;
    }
    res.end();
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default ioHandler;
