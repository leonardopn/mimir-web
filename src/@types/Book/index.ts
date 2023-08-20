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
//TODO: Adicionar mais gêneros a BookGender

export interface Book extends DefaultDoc {
	title: string;
	author: string[];
	publisher: string;
	gender: BookGender[];
	publishDate: Date | null;
	description: string;
	cover: string | null;
	readDate: Date | null;
	tags: string[];
	isbn: string;
	isbn13: string;
}
