import { create } from "zustand";
import { BooksSlice, BooksSliceState } from "./Books";

export type StoreState = BooksSliceState;

export const useAppStore = create<StoreState>()((...a) => ({
	...BooksSlice(...a),
}));
