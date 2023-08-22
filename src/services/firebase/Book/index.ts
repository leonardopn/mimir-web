import { Book } from "@typings/Book";

import FirebaseService from "..";

export class BookService extends FirebaseService {
	static async newBook(data: Omit<Book, "id">): Promise<Book> {
		const newDoc = this.generateDoc(["users", "?", "books"], [data.userId]);

		const bookToAdd: Book = { ...data, id: newDoc.id };

		await this.firestore.setDoc(newDoc, bookToAdd);

		return bookToAdd;
	}
}
