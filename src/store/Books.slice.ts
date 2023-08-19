import { Book } from "@typings/Book";
import { create } from "zustand";

interface BooksState {
	books: Book[];
	addBook: (data: Book) => void;
}

export const useBooks = create<BooksState>()(set => ({
	books: [],
	addBook: book => set(state => ({ books: [...state.books, book] })),
}));
