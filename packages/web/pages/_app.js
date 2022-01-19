import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { SocketContext } from '../context/socket';
import { io } from 'socket.io-client';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({
	Component,

	pageProps: { session, ...pageProps },
}) {
	return (
		<SessionProvider>
			<SocketContext.Provider value={io()}>
				<ChakraProvider>
					<Component {...pageProps} />
				</ChakraProvider>
			</SocketContext.Provider>
		</SessionProvider>
	);
}

export default MyApp;
