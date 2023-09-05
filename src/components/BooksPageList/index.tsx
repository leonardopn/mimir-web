"use client";

import { BookCover } from "@components/BookCover";
import { LoadingFullPage } from "@components/LoadingFullPage";
import { useBooks } from "@hooks/useBooks";
import { Card, TextField } from "@mui/material";
import { debounce, filter } from "lodash";
import { useState } from "react";

interface BooksPageListProps {}

export function BooksPageList({}: BooksPageListProps) {
	const { data, isFetching } = useBooks();

	const [filteredBooks, setFilteredBooks] = useState(data);

	const debouncedSearch = debounce(text => {
		const result = text
			? filter(data, book => {
					return book.title.toLowerCase().includes(text);
			  })
			: data;
		setFilteredBooks(result);
	}, 800);

	if (isFetching) return <LoadingFullPage />;

	return (
		<div className="flex flex-col w-full gap-8">
			<Card>
				<TextField
					className="w-full"
					placeholder="Pesquisei aqui..."
					onChange={e => debouncedSearch(e.target.value)}></TextField>
			</Card>
			<main className="flex gap-8 flex-wrap justify-center w-full">
				{filteredBooks.map(book => (
					<BookCover data={book} alt={book.title + " cover"} key={book.id}></BookCover>
				))}
			</main>
		</div>
	);
}
