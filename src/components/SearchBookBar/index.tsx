"use client";

import { Icon } from "@iconify/react";
import { Card, IconButton, TextField } from "@mui/material";
import { Book } from "@typings/Book";
import { useToggle } from "react-use";

interface SearchBookBarProps {
	data: Book[];
}

export function SearchBookBar({}: SearchBookBarProps) {
	const [showButton, toggleShowButton] = useToggle(false);

	return (
		<div className="flex items-center">
			{showButton && (
				<Card className="h-10 rounded-full">
					<TextField
						className="w-full"
						size="small"
						InputProps={{ classes: { root: "rounded-full" } }}
						placeholder="Pesquisei aqui..."></TextField>
				</Card>
			)}

			<IconButton onClick={toggleShowButton}>
				<Icon icon="mdi:magnify" className="text-white h-8 w-8" />
			</IconButton>
		</div>
	);
}
