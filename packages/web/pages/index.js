import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Box, Button, Center, Heading, Text } from '@chakra-ui/react';
import { SocketContext } from '../context/socket';

const AuthPage = () => {
	const socket = useContext(SocketContext);

	useEffect(() => {
		if (session) {
			console.log('emitting', session);
			socket.emit('user-data', session);
		}
	}, []);
	return <></>;
};

export default function Home() {
	const [id, setId] = useState('');
	const [logs, setLogs] = useState([]);
	const { data: session } = useSession();
	const socket = useContext(SocketContext);

	useEffect(() => {
		if (session) {
			socket.emit('user-data', session);
		}

		const handleId = (id) => {
			setId(id);
		};

		const handleLog = (log) => {
			setLogs((logs) => [log, ...logs]);
		};

		socket.on('id', handleId);
		socket.on('log', handleLog);

		return () => {
			socket.off('id', handleId);
			socket.off('log', handleLog);
		};
	}, [session]);

	if (!session) {
		return (
			<Center mt={4}>
				<Button onClick={signIn}>Login with GitHub</Button>
			</Center>
		);
	}

	return (
		<div>
			<Head>
				<title>remcon</title>
				<meta name='description' content='Remote console.log' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Center mt={4}>
				<Text>Logged in as {session.user.email}</Text>
			</Center>
			{id ? (
				<>
					<Box maxW='4xl' m='0 auto' mt={4}>
						<Heading textAlign={'center'}>{id}</Heading>
						<Box mt={4} p={4} bg='gray.100'>
							{logs.map((log, idx) => (
								<Text key={idx}>
									{new Date().toString()}: {log}
								</Text>
							))}
						</Box>
					</Box>
				</>
			) : (
				<></>
			)}
		</div>
	);
}
