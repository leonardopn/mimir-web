import { Book } from "@typings/Book";
import update from "immutability-helper";
import { StateCreator } from "zustand";

export interface BooksSliceState {
	books: {
		data: Book[];
		addBook: (data: Book) => void;
	};
}

export const BooksSlice: StateCreator<BooksSliceState> = set => ({
	books: {
		data: [],
		addBook: book => set(state => update(state, { books: { data: { $push: [book] } } })),
	},
});
