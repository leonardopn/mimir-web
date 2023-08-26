import { Book } from "@typings/Book";
import { BooksSliceState, StoreState } from "@typings/Store";
import update from "immutability-helper";
import { StateCreator } from "zustand";
import { mockBooks } from "../../mock/books";
import { BookService } from "../../services/firebase/Book";

export const BooksSlice: StateCreator<StoreState, [], [], BooksSliceState> = set => {
	const addBook = (book: Book) =>
		set(state => update(state, { books: { data: { $push: [book] } } }));

	const setInitialFetchWasMade = (initialFetchWasMade: boolean) =>
		set(state =>
			update(state, { books: { initialFetchWasMade: { $set: initialFetchWasMade } } })
		);

	const setInitialStateHasBeenLoaded = (initialStateHasBeenLoaded: boolean) =>
		set(state =>
			update(state, {
				books: { initialStateHasBeenLoaded: { $set: initialStateHasBeenLoaded } },
			})
		);

	const setIsFetching = (isFetching: boolean) => {
		set(state => update(state, { books: { isFetching: { $set: isFetching } } }));
	};

	const fetchBooks = async () => {
		try {
			setIsFetching(true);
			setInitialFetchWasMade(true);

			const books = await BookService.getAll();

			set(state => update(state, { books: { data: { $set: books } } }));
			setInitialStateHasBeenLoaded(true);
		} catch (error) {
			console.error(error);
		} finally {
			setIsFetching(false);
		}
	};

	return {
		data: [...mockBooks],
		initialFetchWasMade: false,
		initialStateHasBeenLoaded: false,
		isFetching: false,
		addBook,
		setIsFetching,
		setInitialFetchWasMade,
		setInitialStateHasBeenLoaded,
		fetchBooks,
	};
};
