import { create } from "zustand";
import { BooksSlice } from "./Books";
import { StoreState } from "@typings/Store";

export const useAppStore = create<StoreState>()((...a) => ({
	books: BooksSlice(...a),
}));
