import { BookApiResult } from "@components/BookApiResult";
import { IStepComponentDefaultProps } from "..";
import { Book } from "@typings/Book";
import { Typography } from "@mui/material";
import { EmptyMessage } from "@components/EmptyMessage";

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
				<Typography className="text-gray-800 text-center font-bold text-xl">
					Foram encontrados: {books.length} livro(s)
				</Typography>
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
