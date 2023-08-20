import { Book } from "@typings/Book";
import { BooksSliceState, StoreState } from "@typings/Store";
import update from "immutability-helper";
import { StateCreator } from "zustand";
import { mockBooks } from "../../mock/books";

export const BooksSlice: StateCreator<StoreState, [], [], BooksSliceState> = set => ({
	data: [...mockBooks],
	addBook: book => set(state => update(state, { books: { data: { $push: [book] } } })),
});
