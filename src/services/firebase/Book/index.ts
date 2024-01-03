import { Book } from "@typings/Book";

import FirebaseService from "..";
import { v4 } from "uuid";
import { omitUndefinedProps } from "toolkit-extra/object";

export interface INewBookData extends Omit<Book, "id" | "cover"> {
	cover: File | null;
}
export class BookService extends FirebaseService {
	static async newBook(data: INewBookData): Promise<Book> {
		const newDoc = this.generateDoc(["users", "?", "books"], [data.userId]);

		const { cover, ...dataRest } = data;

		const bookToAdd: Book = omitUndefinedProps({ ...dataRest, id: newDoc.id });

		if (cover) {
			const uploadedFile = await this.uploadFirebaseFile(
				cover,
				["users", "?", "books", "?", "?"],
				[data.userId, newDoc.id, v4()]
			);
			bookToAdd.cover = { url: uploadedFile.url, ref: uploadedFile.ref.fullPath };
		}

		await this.firestore.setDoc(newDoc, bookToAdd);

		return bookToAdd;
	}

	static async getAll() {
		const booksRef = this.getCollectionRef<Book>(
			["users", "?", "books"],
			["NtmnrIyP6NgiFn90i9TfLfOqegu1"]
		);
		return (await this.firestore.getDocs(booksRef)).docs.map(doc => doc.data() as Book);
	}
}
