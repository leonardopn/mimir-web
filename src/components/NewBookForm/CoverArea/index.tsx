import { Button, Card, Heading } from "@chakra-ui/react";
import { BookCoverDefault } from "@components/BookCoverDefault";
import { useWatch } from "react-hook-form";
import { NewBookFormProps } from "..";

interface CoverAreaProps {}

export function CoverArea({}: CoverAreaProps) {
	const { title, publisher } = useWatch<NewBookFormProps>();

	return (
		<Card className="p-4 flex flex-col items-center gap-3 h-fit lg:sticky lg:top-24 overflow-auto">
			<Heading className="text-xl">Capa do livro</Heading>
			<BookCoverDefault bookTitle={title} publisher={publisher} />
			<Button className="w-full" variant="outline">
				Mudar capa
			</Button>
		</Card>
	);
}
