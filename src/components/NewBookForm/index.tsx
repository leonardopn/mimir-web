"use client";

import { RHFDatePicker } from "@components/Form/RHFDatePicker";
import { RHFInput } from "@components/Form/RHFInput";
import { RHFSelector } from "@components/Form/RHFSelector";
import { Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Book } from "@typings/Book";
import { Dayjs } from "dayjs";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormProps
	extends Omit<Book, "id" | "createdAt" | "updatedAt" | "readDate" | "publishDate"> {
	publishDate: Dayjs | null;
}

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
			<RHFInput control={control} name="publisher" label="Editora"></RHFInput>
			<RHFDatePicker control={control} name="publishDate" label="Data de publicação" />
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
			<RHFSelector
				options={[]}
				control={control}
				name="gender"
				multiple
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
				textFieldProps={{ label: "Gênero" }}
				freeSolo></RHFSelector>
			<RHFInput
				control={control}
				name="description"
				multiline
				minRows={3}
				label="Descrição"></RHFInput>
			<Button type="submit" variant="contained">
				Salvar
			</Button>
		</form>
	);
}
