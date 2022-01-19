import { io } from 'socket.io-client';

const RemCon = (id) => {
	const socket = io(`http://localhost:3000`);
	socket.on('connect', () => {
		console.log('conencted');
	});
	return {
		log(message) {
			console.log('message', message);
			socket.emit('log', {
				id,
				message,
			});
		},
	};
};

export { RemCon };
