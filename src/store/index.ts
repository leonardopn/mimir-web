import { create } from "zustand";
import { BooksSlice } from "./Books";
import { StoreState } from "@typings/Store";
import { SearchSlice } from "./SearchSlice";

export const useAppStore = create<StoreState>()((...a) => ({
	books: BooksSlice(...a),
	search: SearchSlice(...a),
}));
