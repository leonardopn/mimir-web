"use client";

import { useSearch } from "@hooks/useSearch";
import { Icon } from "@iconify/react";
import { Card, IconButton, TextField } from "@mui/material";
import { debounce } from "lodash";
import { useToggle } from "react-use";

export function SearchBookBar() {
	const { setData } = useSearch();
	const [showButton, toggleShowButton] = useToggle(false);

	function handleToggleShowButton() {
		if (showButton) setData("");
		toggleShowButton();
	}

	const handleUpdateSearchData = debounce((data: string) => {
		setData(data);
	}, 800);

	return (
		<div className="flex items-center">
			{showButton && (
				<Card className="h-10 rounded-full">
					<TextField
						onChange={e => handleUpdateSearchData(e.target.value)}
						className="w-full"
						size="small"
						InputProps={{ classes: { root: "rounded-full" } }}
						placeholder="Pesquisei aqui..."></TextField>
				</Card>
			)}

			<IconButton onClick={handleToggleShowButton}>
				<Icon icon="mdi:magnify" className="text-white h-8 w-8" />
			</IconButton>
		</div>
	);
}
