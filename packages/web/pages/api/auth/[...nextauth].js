import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		GithubProvider({
			clientId: '77792fdd0b2741618ed4',
			clientSecret: 'de5eccd63ce499e3d2c84052b3b98214d63a8a31',
		}),
		// ...add more providers here
	],
});
