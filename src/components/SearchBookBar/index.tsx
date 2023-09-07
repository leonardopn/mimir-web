"use client";

import { useSearch } from "@hooks/useSearch";
import { Icon } from "@iconify/react";
import { Badge, Card, IconButton, TextField, Tooltip } from "@mui/material";
import { debounce } from "lodash";
import { usePathname } from "next/navigation";
import { useToggle } from "react-use";

export function SearchBookBar() {
	const pathname = usePathname();
	const { setData, data, pagesToShow } = useSearch();
	const [showButton, toggleShowButton] = useToggle(false);

	const handleUpdateSearchData = debounce((data: string) => {
		setData(data);
	}, 800);

	if (!pagesToShow.includes(pathname)) return null;

	return (
		<div className="flex items-center">
			{showButton && (
				<Card className="h-10 rounded-full">
					<TextField
						autoFocus
						defaultValue={data}
						onChange={e => handleUpdateSearchData(e.target.value)}
						className="w-full"
						size="small"
						InputProps={{ classes: { root: "rounded-full" } }}
						placeholder="Pesquisei aqui..."></TextField>
				</Card>
			)}

			<Badge badgeContent={data ? "!" : 0} color="primary" overlap="circular">
				<Tooltip title={data ? "Há uma busca ativa." : "Buscar..."} arrow>
					<IconButton onClick={toggleShowButton}>
						<Icon icon="mdi:magnify" className="text-white h-8 w-8" />
					</IconButton>
				</Tooltip>
			</Badge>
		</div>
	);
}
