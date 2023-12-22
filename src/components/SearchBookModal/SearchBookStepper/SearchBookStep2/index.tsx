import { BookApiResult } from "@components/BookApiResult";
import { IStepComponentDefaultProps } from "..";
import { Book } from "@typings/Book";
import { EmptyMessage } from "@components/EmptyMessage";
import { Text } from "@chakra-ui/react";

export function SearchBookStep2({
	books,
	setSelectedBook,
	handleNextStep,
}: IStepComponentDefaultProps) {
	function handleSelectBook(data: Partial<Book>) {
		setSelectedBook(data);
		handleNextStep();
	}

	return (
		<div className="flex flex-col gap-5 h-full">
			<header>
				<Text className="text-gray-800 text-center font-bold text-xl">
					Foram encontrados: {books.length} livro(s)
				</Text>
			</header>
			{!books.length && <EmptyMessage className="my-auto sm:my-24"></EmptyMessage>}
			{books.map((book, index) => {
				return (
					<BookApiResult
						data={book}
						key={index}
						onClick={handleSelectBook}></BookApiResult>
				);
			})}
		</div>
	);
}
