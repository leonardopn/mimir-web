import { Book } from "@typings/Book";
import { IGoogleBooksApi } from "../../services/GoogleBooksAPI";
import dayjs from "dayjs";

export function extractIsbnGoogleBooks(data: IGoogleBooksApi): {
	v10: string | null;
	v13: string | null;
} {
	let v10: string | null = null;
	let v13: string | null = null;

	data.volumeInfo?.industryIdentifiers?.forEach(isbnVariant => {
		if (isbnVariant.type && isbnVariant.identifier) {
			switch (isbnVariant.type) {
				case "ISBN_13":
					v13 = isbnVariant.identifier;
					break;
				case "ISBN_10":
					v10 = isbnVariant.identifier;
					break;
			}
		}
	});

	return { v10, v13 };
}

export function extractPublishDateGoogleBooks(data: IGoogleBooksApi) {
	if (data.volumeInfo?.publishedDate) {
		return dayjs(data.volumeInfo?.publishedDate);
	}
	return null;
}

export function googleBookToLocalBooks(data: IGoogleBooksApi): Partial<Book> {
	const { volumeInfo } = data;

	const isbn = extractIsbnGoogleBooks(data);
	const publishDate = extractPublishDateGoogleBooks(data);

	const imageUrlToUse =
		volumeInfo?.imageLinks?.thumbnail || volumeInfo?.imageLinks?.smallThumbnail || "";

	const dataToReturn: Partial<Book> = {
		isbn: isbn.v10 || "",
		isbn13: isbn.v13 || "",
		author: volumeInfo?.authors || [],
		title: volumeInfo?.title,
		description: volumeInfo?.description,
		publisher: volumeInfo?.publisher,
		publishDate: publishDate?.toDate(),
		cover: {
			ref: "",
			url: imageUrlToUse,
		},
	};

	return dataToReturn;
}
