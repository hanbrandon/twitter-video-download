import 'focus-visible';
import '@/styles/tailwind.css';
import '@/styles/global.css';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
	return (
		<SessionProvider session={session} refetchInterval={5 * 60}>
			<Toaster position="bottom-right" reverseOrder={false} />

			<Component {...pageProps}></Component>
		</SessionProvider>
	);
};

export default App;
