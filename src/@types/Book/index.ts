import { DefaultDoc } from "@typings/DefaultDoc";

export enum BookGender {
	"Romance",
	"Fantasia",
	"Sci-Fi",
	"Não ficção",
	"Biografia",
	"Autoajuda",
	"Infantil",
	"Outros",
}

export interface Book extends DefaultDoc {
	id: string;
	createdAt: string;
	updatedAt: string;
	title: string;
	userId: string;
	author: string[];
	publisher: string;
	gender: BookGender[];
	publishDate: string | null;
	description: string;
	cover: {
		url: string;
		ref: string;
	} | null;
	readDate: string | null;
	tags: string[];
	isbn: string;
	isbn13: string;
}
