"use client";

import { BookCover } from "@components/BookCover";
import { useBooks } from "@hooks/useBooks";

interface BooksPageListProps {}

export function BooksPageList({}: BooksPageListProps) {
	const { data } = useBooks();
	return (
		<div className="flex gap-8 flex-wrap justify-center w-full">
			{data?.map(book => (
				<BookCover data={book} alt={book.title + " cover"} key={book.id}></BookCover>
			))}
		</div>
	);
}
