import { useAppStore } from "@store/index";

export function useBooks() {
	const { books } = useAppStore();

	return books;
}
