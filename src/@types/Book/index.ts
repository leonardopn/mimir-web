import { DefaultDoc } from "@typings/DefaultDoc";
import { StorageFile } from "@typings/Firebase";

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
	userId: string;
	title: string;
	publisher: string;
	author: string[];

	//NOTE: Optionals
	gender?: BookGender[];
	publishDate?: string;
	description?: string;
	cover?: StorageFile;
	readDate?: string;
	tags?: string[];
	isbn?: string;
	isbn13?: string;
}
