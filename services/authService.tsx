import { setSession, getSession, clearSession } from "./sessionManager";

const AuthService = {
	login: async (userId: string, email:string) => {
		const sessionId = generateSessionId(userId); 
		await setSession(sessionId, email);
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
