"use client";

import { BookCover } from "@components/BookCover";
import { LoadingFullPage } from "@components/LoadingFullPage";
import { useBooks } from "@hooks/useBooks";
import { useFilterBooksContext } from "@hooks/useFilterBooksContext";

interface BooksPageListProps {}

export function BooksPageList({}: BooksPageListProps) {
	const { filteredBooks } = useFilterBooksContext();
	const { isFetching } = useBooks();

	if (isFetching) return <LoadingFullPage />;

	return (
		<div className="flex flex-col w-full gap-8">
			<main className="flex gap-8 flex-wrap justify-center w-full">
				{filteredBooks.map(book => (
					<BookCover data={book} alt={book.title + " cover"} key={book.id}></BookCover>
				))}
			</main>
		</div>
	);
}
