"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ReactNode } from "react";
import { LocalizationProvider as MUILocalizationProvider } from "@mui/x-date-pickers";
import "dayjs/locale/pt-br";

interface LocalizationProviderProps {
	children: ReactNode;
}

export function LocalizationProvider({ children }: LocalizationProviderProps) {
	return (
		<MUILocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
			{children}
		</MUILocalizationProvider>
	);
}
