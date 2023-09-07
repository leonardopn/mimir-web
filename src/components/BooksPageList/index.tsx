"use client";

import { BookCover } from "@components/BookCover";
import { EmptyMessage } from "@components/EmptyMessage";
import { LoadingFullPage } from "@components/LoadingFullPage";
import { useBooks } from "@hooks/useBooks";
import { useSearch } from "@hooks/useSearch";
import { filter, map } from "lodash";
import { useMemo } from "react";

interface BooksPageListProps {}

export function BooksPageList({}: BooksPageListProps) {
	const { data: textToSearch } = useSearch();
	const { data, isFetching } = useBooks();

	const filteredBooks = useMemo(() => {
		if (!textToSearch) return data;

		const textUpper = textToSearch.toUpperCase();

		return filter(data, book => {
			return book.title.toUpperCase().includes(textUpper);
		});
	}, [data, textToSearch]);

	if (isFetching) return <LoadingFullPage />;
	if (!filteredBooks.length) return <EmptyMessage />;

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
