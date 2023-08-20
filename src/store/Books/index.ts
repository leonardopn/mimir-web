import { Book } from "@typings/Book";
import { StateCreator, create } from "zustand";

interface BooksSliceStates {
	books: Book[];
	addBook: (data: Book) => void;
}

export const BooksSlice: StateCreator<BooksSliceStates> = set => ({
	books: [],
	addBook: book => set(state => ({ books: [...state.books, book] })),
});
