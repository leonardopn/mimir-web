"use client";

import { Link } from "@chakra-ui/next-js";
import { IconButton, IconButtonProps, Tooltip } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

interface FloatingAddButtonProps extends Omit<IconButtonProps, "aria-label"> {
	tip?: string;
	link?: string;
}

export function FloatingAddButton({ tip = "", link = "#", ...restProps }: FloatingAddButtonProps) {
	return (
		<Tooltip label={tip} hasArrow placement="top">
			<Link href={link} className="fixed bottom-10 right-10">
				<IconButton
					colorScheme="primary"
					className="rounded-full"
					aria-label="floating button action"
					{...restProps}>
					<Icon icon="mdi:plus" className="text-white h-8 w-8"></Icon>
				</IconButton>
			</Link>
		</Tooltip>
	);
}
