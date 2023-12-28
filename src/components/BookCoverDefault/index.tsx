import { Text } from "@chakra-ui/react";
import Image from "next/image";
import LogoSVG from "../../../public/imgs/logo.svg";

interface BookCoverDefaultProps {
	bookTitle?: string;
	publisher?: string;
}

export function BookCoverDefault({ bookTitle, publisher }: BookCoverDefaultProps) {
	const titleToUse = bookTitle || "Título do livro";

	return (
		<div className="bg-secondary rounded-md w-64 h-96 flex flex-col justify-between items-center text-center gap-2 shadow-sm p-3 line-clamp-2">
			<div className="flex-1 flex flex-col gap-2 justify-center items-center">
				<Image src={LogoSVG} alt="logo" className="w-10" />
				<Text className="text-white font-medium text-lg line-clamp-2" title={titleToUse}>
					{titleToUse}
				</Text>
			</div>
			{!!publisher && (
				<Text
					className="text-white font-medium text-lg truncate max-w-full"
					title={publisher}>
					{publisher}
				</Text>
			)}
		</div>
	);
}
