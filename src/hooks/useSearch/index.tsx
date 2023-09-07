import { useAppStore } from "@store/index";

export function useSearch() {
	const { search } = useAppStore();

	return {
		...search,
	};
}
