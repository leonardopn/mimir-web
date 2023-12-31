"use client";

import { Card, Container, Heading, Tag, Text } from "@chakra-ui/react";
import { BookCover } from "@components/BookCover";
import { Breadcrumbs } from "@components/Breadcrumbs";
import { LoadingFullPage } from "@components/LoadingFullPage";
import { useBooks } from "@hooks/useBooks";

import { BookGender } from "@typings/Book";
import dayjs from "dayjs";

interface BookViewProps {
	params: {
		id: string;
	};
}

export default function BookView({ params: { id } }: BookViewProps) {
	const { foundBook, isFetching } = useBooks({ id });

	if (!foundBook || isFetching) return <LoadingFullPage />;

	return (
		<Container maxW="container.xl">
			<header className="mb-8">
				<Breadcrumbs
					links={[
						{ label: "Livros", href: "/books" },
						{ label: foundBook.title },
					]}></Breadcrumbs>
			</header>
			<main className="flex flex-col lg:flex-row gap-5 justify-center items-center lg:items-start flex-wrap  ">
				<div className="lg:sticky lg:top-24 h-fit w-fit">
					<BookCover
						disableLink
						id={foundBook.id}
						readDate={foundBook.readDate}
						title={foundBook.title}
						publisher={foundBook.publisher}
						src={foundBook.cover?.url}
					/>
				</div>
				<Card className="p-5 rounded-xl shadow-xl flex-1 flex flex-col gap-5 text-gray-800 min-h-[400px] justify-between w-full">
					<header className="relative pr-10">
						<Heading variant="h1" className="text-3xl font-bold">
							{foundBook.title}
						</Heading>
						<Heading variant="h2" className="text-xl font-medium text-gray-600">
							{foundBook.author.join(", ")}
						</Heading>

						{!!foundBook.gender.length && (
							<div className="flex flex-wrap gap-2 mt-2">
								{foundBook.gender.map((gender, index) => (
									<Tag key={index}>{BookGender[gender]}</Tag>
								))}
							</div>
						)}
					</header>

					<Text className="text-base text-justify text-gray-600">
						{foundBook.description}
					</Text>
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center text-center">
						<div>
							<Text className="font-bold">Editora</Text>
							<Text className="text-sm   text-gray-600">{foundBook.publisher}</Text>
						</div>
						<div>
							<Text className="font-bold">1° Publicação</Text>
							<Text className="text-sm   text-gray-600">
								{foundBook.publishDate
									? dayjs(foundBook.publishDate).format("DD/MM/YYYY")
									: "Não informado"}
							</Text>
						</div>
						<div>
							<Text className="font-bold">ISBN-10</Text>
							<Text className="text-sm   text-gray-600">{foundBook.isbn}</Text>
						</div>
						<div>
							<Text className="font-bold">ISBN-13</Text>
							<Text className="text-sm   text-gray-600">{foundBook.isbn13}</Text>
						</div>
					</div>
				</Card>
			</main>
		</Container>
	);
}
