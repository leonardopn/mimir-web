import { Book } from "../Book/index";

export interface ISliceState {
	isFetching: boolean;
	setIsFetching: (isFetching: boolean) => void;

	initialFetchWasMade: boolean;
	setInitialFetchWasMade: (initialFetchWasMade: boolean) => void;

	initialStateHasBeenLoaded: boolean;
	setInitialStateHasBeenLoaded: (initialStateHasBeenLoaded: boolean) => void;
}

export interface BooksSliceState extends ISliceState {
	data: Book[];
	addBook: (data: Book) => void;
	fetchBooks: () => Promise<void>;
}

export interface SearchSliceState {
	data: string;
	setData: (data: string) => void;
	pagesToShow: string[];
}

export interface StoreState {
	books: BooksSliceState;
	search: SearchSliceState;
}
