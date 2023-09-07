"use client";

import { createBreakpoint } from "react-use";

type Sizes = "sm" | "md" | "lg" | "xl" | "2xl";

const useBreakpoint = createBreakpoint({ sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 });

export function useResponsive(breakpoint: Sizes) {
	const currentBreakpoint = useBreakpoint() as Sizes;

	return currentBreakpoint === breakpoint;
}
