import { useMediaQuery } from "react-responsive";

export function useResponsive() {
	const isSm = useMediaQuery({ minWidth: 640 });
	const isMd = useMediaQuery({ minWidth: 768 });
	const isLg = useMediaQuery({ minWidth: 1024 });
	const isXl = useMediaQuery({ minWidth: 1280 });
	const is2xl = useMediaQuery({ minWidth: 1536 });

	return { isSm, isMd, isLg, isXl, is2xl };
}
