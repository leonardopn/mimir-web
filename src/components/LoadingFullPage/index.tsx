import { Spinner, Text } from "@chakra-ui/react";
import { twMerge } from "tailwind-merge";

interface LoadingFullPageProps {
	className?: string;
}

export function LoadingFullPage({ className }: LoadingFullPageProps) {
	return (
		<div
			className={twMerge(
				"flex flex-col justify-center items-center gap-4 w-fit h-fit m-auto",
				className
			)}>
			<Spinner className="text-primary-500"></Spinner>
			<Text className="text-gray-500">Carregando dados...</Text>
		</div>
	);
}
