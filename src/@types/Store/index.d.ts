import { Book } from "../Book/index";

export interface BooksSliceState {
	data: Book[];
	addBook: (data: Book) => void;
}

export interface StoreState {
	books: BooksSliceState;
}
