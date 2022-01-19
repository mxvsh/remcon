const express = require('express');
const next = require('next');
const shortid = require('shortid');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const ROOMS = {};

app
	.prepare()
	.then(() => {
		const server = express();
		const http = require('http').Server(server);
		const io = require('socket.io')(http);

		io.on('connection', (socket) => {
			console.log('socket', socket.id);
			socket.on('user-data', (data) => {
				const id = shortid.generate();
				const already = ROOMS[data.user.email];

				if (already) {
					socket.join(already);
					socket.emit('id', already);
				} else {
					socket.join(id);
					socket.emit('id', id);
					ROOMS[data.user.email] = id;
				}
			});

			socket.on('log', (data) => {
				console.log('data', data);
				const { id, message } = data;
				io.to(id).emit('log', message);
			});
		});

		server.all('*', (req, res) => {
			return handle(req, res);
		});

		http.listen(3000, (err) => {
			if (err) throw err;
			console.log('> Ready on http://localhost:3000');
		});
	})
	.catch((ex) => {
		console.error(ex.stack);
		process.exit(1);
	});
