"use client";

import { ChakraProvider as Provider } from "@chakra-ui/react";
import { theme } from "../../global/Theme";

export function ChakraProvider({ children }: { children: React.ReactNode }) {
	return <Provider theme={theme}>{children}</Provider>;
}
