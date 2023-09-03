import { Timestamp } from "firebase/firestore";

export type InterfaceVariant = "DB" | "LOCAL";

export type AppDate<Variant extends InterfaceVariant = "LOCAL"> = Variant extends "LOCAL"
	? Date
	: Timestamp;
