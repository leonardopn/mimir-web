import { DefaultDoc } from "@typings/DefaultDoc";

export enum BookGender {}
//TODO: Adicionar mais gêneros a BookGender

export interface Book extends DefaultDoc {
	title: string;
	author: string[];
	publisher: string;
	gender: BookGender[];
	publishDate: Date;
	about: string;
	cover: string | null;
	readDate: Date | null;
	tags: string[];
}
