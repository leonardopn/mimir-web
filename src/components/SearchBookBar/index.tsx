"use client";

import { Badge, Card, IconButton, Input, Tooltip } from "@chakra-ui/react";
import { useSearch } from "@hooks/useSearch";
import { Icon } from "@iconify/react";
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
					<Input
						autoFocus
						defaultValue={data}
						onChange={e => handleUpdateSearchData(e.target.value)}
						className="w-full"
						size="small"
						rounded="full"
						placeholder="Pesquisei aqui..."></Input>
				</Card>
			)}

			<Tooltip title={data ? "Há uma busca ativa." : "Buscar..."} hasArrow>
				<IconButton onClick={toggleShowButton} aria-label={"button search"}>
					<Icon icon="mdi:magnify" className="text-white h-8 w-8" />
				</IconButton>
			</Tooltip>
		</div>
	);
}
