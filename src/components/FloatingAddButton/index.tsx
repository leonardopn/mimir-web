"use client";

import { Icon } from "@iconify/react";
import { Fab, FabProps, Tooltip } from "@mui/material";
import Link from "next/link";

interface FloatingAddButtonProps extends FabProps {
	tip?: string;
	link?: string;
}

export function FloatingAddButton({ tip = "", link = "#", ...restProps }: FloatingAddButtonProps) {
	return (
		<Tooltip title={tip} arrow placement="top">
			<Link href={link} className="fixed bottom-10 right-10">
				<Fab className="bg-primary " aria-label="add" {...restProps}>
					<Icon icon="mdi:plus" className="text-white h-8 w-8"></Icon>
				</Fab>
			</Link>
		</Tooltip>
	);
}
