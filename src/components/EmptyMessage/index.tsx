import { Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
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
			<Icon icon={icon} className="text-primary-500 sm:h-24 sm:w-24 h-20 w-20"></Icon>
			<Text className="text-gray-700 text-3xl font-bold">{message}</Text>
			<Text className="text-gray-500 text-lg">{subMessage}</Text>
		</div>
	);
}
