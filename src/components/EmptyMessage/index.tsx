import { Icon } from "@iconify/react";
import { CircularProgress, Typography } from "@mui/material";
import { twMerge } from "tailwind-merge";

interface EmptyMessage {
	className?: string;
	message?: string;
	subMessage?: string;
	icon?: string;
}

export function EmptyMessage({
	className,
	icon = "noto:books",
	message = "Nossa que vazio...",
	subMessage = "Não há nenhum dado para ser exibido aqui.",
}: EmptyMessage) {
	return (
		<div
			className={twMerge(
				"flex flex-col justify-center items-center gap-1 w-fit h-fit m-auto text-center",
				className
			)}>
			<Icon icon={icon} className="text-primary sm:h-24 sm:w-24 h-20 w-20"></Icon>
			<Typography className="text-gray-700 text-3xl font-bold">{message}</Typography>
			<Typography className="text-gray-500 text-lg">{subMessage}</Typography>
		</div>
	);
}
