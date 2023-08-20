import { useAppStore } from "@store/index";
import { useMemo } from "react";

interface UseBooksProps {
	id?: string;
}

export function useBooks(props?: UseBooksProps) {
	const { books } = useAppStore();

	const foundBook = useMemo(() => {
		if (!props?.id) return null;

		return books.data.find(book => book.id === props.id) || null;
	}, [books.data, props?.id]);

	return {
		...books,
		foundBook,
	};
}
