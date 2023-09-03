import { CircularProgress, Typography } from "@mui/material";

interface LoadingFullPageProps {}

export function LoadingFullPage({}: LoadingFullPageProps) {
	return (
		<div className="flex flex-col justify-center items-center gap-4 w-fit h-fit">
			<CircularProgress className="text-primary"></CircularProgress>
			<Typography className="text-gray-500">Carregando dados...</Typography>
		</div>
	);
}
