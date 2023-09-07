import { SearchSliceState, StoreState } from "@typings/Store";
import update from "immutability-helper";
import { StateCreator } from "zustand";

export const SearchSlice: StateCreator<StoreState, [], [], SearchSliceState> = set => {
	const setData = (data: string) =>
		set(state => update(state, { search: { data: { $set: data } } }));

	const pagesToShow = ["/books"];

	return {
		data: "",
		setData,
		pagesToShow,
	};
};
