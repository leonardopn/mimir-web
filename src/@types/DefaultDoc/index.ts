import { AppDate, InterfaceVariant } from "@typings/Firebase";

export class DefaultDoc<Variant extends InterfaceVariant = "LOCAL"> {
	id!: string;
	createdAt!: AppDate<Variant>;
	updatedAt!: AppDate<Variant>;

	static fromDatabase(data: DefaultDoc<"DB">): DefaultDoc {
		const createdAt = data.createdAt.toDate();
		const updatedAt = data.updatedAt.toDate();

		return { ...data, updatedAt, createdAt };
	}
}
