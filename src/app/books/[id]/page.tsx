"use client";
import { BookCover } from "@components/BookCover";
import { Breadcrumbs } from "@components/Breadcrumbs";
import { useBooks } from "@hooks/useBooks";
import { Icon } from "@iconify/react";
import { Card, Chip, CircularProgress, Container, Tooltip, Typography } from "@mui/material";
import { BookGender } from "@typings/Book";
import dayjs from "dayjs";

interface BookViewProps {
	params: {
		id: string;
	};
}

export default function BookView({ params: { id } }: BookViewProps) {
	const { foundBook } = useBooks({ id });

	if (!foundBook) return <CircularProgress />;

	return (
		<Container>
			<header className="mb-8">
				<Breadcrumbs
					links={[
						{ label: "Livros", href: "/books" },
						{ label: foundBook.title },
					]}></Breadcrumbs>
			</header>
			<main className="flex flex-col lg:flex-row gap-5 justify-center items-center lg:items-start flex-wrap">
				<div className="lg:sticky lg:top-24 h-fit w-fit">
					<BookCover data={foundBook} disableLink />
				</div>

				<Card className="p-5 rounded-xl shadow-xl flex-1 flex flex-col gap-5 text-gray-800">
					<header className="relative pr-10">
						<Typography variant="h1" className="text-3xl font-bold">
							{foundBook.title}
						</Typography>
						<Typography variant="h2" className="text-xl font-medium text-gray-600">
							{foundBook.author.join(", ")}
						</Typography>
						{!!foundBook.readDate && (
							<Tooltip
								title={`Lido em: ${dayjs(foundBook.readDate).format(
									"ddd, DD MMM YYYY"
								)}`}
								arrow>
								<Icon
									icon="mdi:check-decagram"
									className="text-green-500 h-10 w-10 absolute top-0 right-0"></Icon>
							</Tooltip>
						)}
					</header>

					{!!foundBook.gender.length && (
						<div className="flex flex-wrap gap-2">
							{foundBook.gender.map((gender, index) => (
								<Chip key={index} label={BookGender[gender]}></Chip>
							))}
						</div>
					)}

					<Typography className="text-base text-justify text-gray-600">
						{foundBook.description}
					</Typography>
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center text-center">
						<div>
							<Typography className="font-bold">Editora</Typography>
							<Typography className="text-sm   text-gray-600">
								{foundBook.publisher}
							</Typography>
						</div>
						<div>
							<Typography className="font-bold">1° Publicação</Typography>
							<Typography className="text-sm   text-gray-600">
								{foundBook.publishDate
									? dayjs(foundBook.publishDate).format("DD/MM/YYYY")
									: "Não informado"}
							</Typography>
						</div>
						<div>
							<Typography className="font-bold">ISBN-10</Typography>
							<Typography className="text-sm   text-gray-600">
								{foundBook.isbn}
							</Typography>
						</div>
						<div>
							<Typography className="font-bold">ISBN-13</Typography>
							<Typography className="text-sm   text-gray-600">
								{foundBook.isbn13}
							</Typography>
						</div>
					</div>
				</Card>
			</main>
		</Container>
	);
}
