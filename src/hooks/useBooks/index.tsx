import { useAppStore } from "@store/index";
import { useEffect, useMemo } from "react";

interface UseBooksProps {
	id?: string;
}

export function useBooks(props?: UseBooksProps) {
	const { books } = useAppStore();

	const { initialFetchWasMade, fetchBooks } = books;

	const foundBook = useMemo(() => {
		if (!props?.id) return null;

		return books.data.find(book => book.id === props.id) || null;
	}, [books.data, props?.id]);

	useEffect(() => {
		if (!initialFetchWasMade) {
			fetchBooks();
		}
	}, [fetchBooks, initialFetchWasMade]);

	return {
		...books,
		foundBook,
	};
}
