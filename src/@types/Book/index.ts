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
	public id!: string;
	public createdAt!: AppDate<Variant>;
	public updatedAt!: AppDate<Variant>;
	public title!: string;
	public userId!: string;
	public author!: string[];
	public publisher!: string;
	public gender!: BookGender[];
	public publishDate!: AppDate<Variant> | null;
	public description!: string;
	public cover!: {
		url: string;
		ref: string;
	} | null;
	public readDate!: AppDate<Variant> | null;
	public tags!: string[];
	public isbn!: string;
	public isbn13!: string;

	static fromDatabase(data: Book<"DB">): Book {
		const defaultDoc = DefaultDoc.fromDatabase(data);
		const readDate = data.readDate ? data.readDate.toDate() : null;
		const publishDate = data.publishDate ? data.publishDate.toDate() : null;

		return { ...data, ...defaultDoc, readDate, publishDate };
	}
}
