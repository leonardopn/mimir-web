"use client";

import { RHFInput } from "@components/Form/RHFInput";
import { RHFSelector } from "@components/Form/RHFSelector";
import { Button } from "@mui/material";
import { Book } from "@typings/Book";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormProps extends Omit<Book, "id" | "createdAt" | "updatedAt" | "readDate"> {}

export function NewBookForm() {
	const { control, handleSubmit } = useForm<FormProps>({
		defaultValues: {
			title: "",
			description: "",
			author: [],
			cover: null,
			gender: [],
			isbn: "",
			isbn13: "",
			publishDate: null,
			publisher: "",
			tags: [],
		},
	});

	const onSubmit: SubmitHandler<FormProps> = data => {
		console.log(data);
	};

	return (
		<form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit(onSubmit)}>
			<RHFInput control={control} name="title" label="Título"></RHFInput>
			<RHFInput control={control} name="isbn" label="ISBN"></RHFInput>
			<RHFInput control={control} name="isbn13" label="ISBN13"></RHFInput>
			<RHFInput
				control={control}
				name="description"
				multiline
				minRows={3}
				label="Descrição"></RHFInput>
			<RHFSelector
				options={[]}
				control={control}
				name="author"
				multiple
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
				textFieldProps={{ label: "Autores" }}
				freeSolo></RHFSelector>
			<Button type="submit" variant="contained">
				Salvar
			</Button>
		</form>
	);
}
