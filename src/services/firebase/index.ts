import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as firestore from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
	appId: process.env.NEXT_PUBLIC_FIREBASE_APPID || "",
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
};

const { collection, doc, getFirestore } = firestore;

const firebaseApp = initializeApp(firebaseConfig);

export const AUTH = getAuth(firebaseApp);

export const DB = getFirestore(firebaseApp);

export const STORAGE = getStorage(firebaseApp);

export type DB_LOCATIONS = "users" | "books" | "?";

export function firebaseQueryBuilder(fields: DB_LOCATIONS[], values?: (string | number)[]) {
	const numberOfQuestions = fields.filter(field => field === "?").length;

	if (numberOfQuestions > 0 && !values) {
		throw new Error("Você deve fornecer valores para todos os pontos de interrogação");
	}

	if (numberOfQuestions !== (values?.length || 0)) {
		throw new Error(
			"O número de valores deve corresponder ao número de pontos de interrogação"
		);
	}

	const buildedFields = fields.map(field => {
		if (field !== "?") return field;
		return `${values?.shift()}`;
	});

	return buildedFields.join("/");
}

export default class FirebaseService {
	protected static firestore = firestore;

	/**
	 * @description Gera um novo documento vazio no firestore
	 * @param location Array com as collections possíveis
	 * @param values  Array com os valores para substituir os pontos de interrogação
	 * @returns Uma ref de um novo documento do firebase
	 */
	static generateDoc<T extends firestore.DocumentData>(
		location: DB_LOCATIONS[],
		values?: (string | number)[]
	) {
		return doc(
			collection(DB, firebaseQueryBuilder(location, values))
		) as firestore.DocumentReference<T>;
	}
}
