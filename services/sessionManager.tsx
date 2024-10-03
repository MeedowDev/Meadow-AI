import * as SecureStore from "expo-secure-store";

const SESSION_KEY = "userSession";

export const setSession = async (sessionId: string) => {
	await SecureStore.setItemAsync(SESSION_KEY, sessionId);
};

export const getSession = async () => {
	return await SecureStore.getItemAsync(SESSION_KEY);
};

export const clearSession = async () => {
	await SecureStore.deleteItemAsync(SESSION_KEY);
};
