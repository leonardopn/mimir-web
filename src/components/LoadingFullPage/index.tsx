import { CircularProgress, Typography } from "@mui/material";
import { twMerge } from "tailwind-merge";

interface LoadingFullPageProps {
	className?: string;
}

export function LoadingFullPage({ className }: LoadingFullPageProps) {
	return (
		<div
			className={twMerge(
				"flex flex-col justify-center items-center gap-4 w-fit h-fit",
				className
			)}>
			<CircularProgress className="text-primary"></CircularProgress>
			<Typography className="text-gray-500">Carregando dados...</Typography>
		</div>
	);
}
