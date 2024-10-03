import * as SecureStore from "expo-secure-store";

const SESSION_KEY = "userSession";
const EMAIL_KEY = "userEmail";

export const setSession = async (sessionId: string, email: string) => {
	await SecureStore.setItemAsync(SESSION_KEY, sessionId);
	await SecureStore.setItemAsync(EMAIL_KEY, email);
};

export const getSession = async () => {
	return await SecureStore.getItemAsync(SESSION_KEY);
};

export const clearSession = async () => {
	await SecureStore.deleteItemAsync(SESSION_KEY);
	await SecureStore.deleteItemAsync(EMAIL_KEY);
};
