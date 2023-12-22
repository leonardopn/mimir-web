"use client";

import { ChakraProvider as Provider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { theme } from "../../global/Theme";

export function ChakraProvider({ children }: { children: React.ReactNode }) {
	return (
		<CacheProvider>
			<Provider theme={theme}>{children}</Provider>
		</CacheProvider>
	);
}
