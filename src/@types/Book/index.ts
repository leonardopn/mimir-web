import { DefaultDoc } from "@typings/DefaultDoc";
import { AppDate, InterfaceVariant } from "@typings/Firebase";

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

export class Book<Variant extends InterfaceVariant = "LOCAL"> implements DefaultDoc<Variant> {
	id!: string;
	createdAt!: AppDate<Variant>;
	updatedAt!: AppDate<Variant>;
	title!: string;
	userId!: string;
	author!: string[];
	publisher!: string;
	gender!: BookGender[];
	publishDate!: AppDate<Variant> | null;
	description!: string;
	cover!: {
		url: string;
		ref: string;
	} | null;
	readDate!: AppDate<Variant> | null;
	tags!: string[];
	isbn!: string;
	isbn13!: string;

	static fromDatabase(data: Book<"DB">): Book {
		const defaultDoc = DefaultDoc.fromDatabase(data);
		const readDate = data.readDate ? data.readDate.toDate() : null;
		const publishDate = data.publishDate ? data.publishDate.toDate() : null;

		return { ...data, ...defaultDoc, readDate, publishDate };
	}
}
