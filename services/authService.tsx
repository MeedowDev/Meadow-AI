import { setSession, getSession, clearSession } from "./sessionManager";

const AuthService = {
	login: async (userId: string) => {
		const sessionId = generateSessionId(userId); // A simple function to generate sessionId
		await setSession(sessionId);
		return sessionId;
	},

	logout: async () => {
		await clearSession();
	},

	getSession: async () => {
		return await getSession();
	},
};

const generateSessionId = (userId: string) => {
	return `${userId}-${new Date().getTime()}`;
};

export default AuthService;
