export type DefaultEnvs = {
	NEXT_PUBLIC_FIREBASE_API_KEY: string;
	NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
	NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
	NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
	NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
	NEXT_PUBLIC_FIREBASE_APPID: string;
	NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string;
};

declare global {
	namespace NodeJS {
		interface ProcessEnv extends DefaultEnvs {}
	}
}

export {};
