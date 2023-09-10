"use client";

import { RHFDatePicker } from "@components/Form/RHFDatePicker";
import { RHFInput } from "@components/Form/RHFInput";
import { RHFSelector } from "@components/Form/RHFSelector";
import { useBooks } from "@hooks/useBooks";
import { Icon } from "@iconify/react";
import { Button, IconButton } from "@mui/material";
import { Book } from "@typings/Book";
import { Dayjs } from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BookService } from "../../services/firebase/Book";
import { SearchBookModal } from "@components/SearchBookModal";
import { useToggle } from "react-use";

interface FormProps
	extends Omit<Book, "id" | "createdAt" | "updatedAt" | "readDate" | "publishDate" | "cover"> {
	publishDate: Dayjs | null;
	cover: FileList | null;
}

export function NewBookForm() {
	const { addBook } = useBooks();
	const [showDialog, toggleShowDialog] = useToggle(false);
	const [coverUrl, setCoverUrl] = useState("");
	const { control, handleSubmit, register, resetField, watch } = useForm<FormProps>({
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

	const cover = watch("cover");

	function handleResetCover() {
		resetField("cover");
	}

	const onSubmit: SubmitHandler<FormProps> = async data => {
		const bookInDB = await BookService.newBook({
			createdAt: new Date(),
			updatedAt: new Date(),
			author: data.author,
			description: data.description,
			gender: data.gender,
			isbn: data.isbn,
			isbn13: data.isbn13,
			publishDate: data.publishDate?.toDate() || null,
			publisher: data.publisher,
			readDate: null,
			tags: data.tags,
			title: data.title,
			cover: data.cover?.item(0) || null,
			userId: "NtmnrIyP6NgiFn90i9TfLfOqegu1",
		});

		addBook(bookInDB);
	};

	useEffect(() => {
		if (cover) {
			const file = cover.item(0);
			file && setCoverUrl(URL.createObjectURL(file));
		} else {
			setCoverUrl("");
		}
	}, [cover]);

	return (
		<>
			<form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit(onSubmit)}>
				<Button onClick={toggleShowDialog} variant="contained">
					Buscar livro
				</Button>
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
				<div className="flex gap-1 justify-between items-center">
					<input
						type="file"
						accept="image/png, image/jpeg"
						{...register("cover")}></input>
					{!!cover && (
						<IconButton onClick={handleResetCover} color="error" size="small">
							<Icon icon="mdi:close-circle"></Icon>
						</IconButton>
					)}
				</div>
				{!!coverUrl && (
					<div className="flex justify-center items-center">
						<Image src={coverUrl} width={300} height={500} alt="book cover"></Image>
					</div>
				)}
				<Button type="submit" variant="contained">
					Salvar
				</Button>
			</form>
			<SearchBookModal
				open={showDialog}
				onConfirm={data => console.log(data)}
				onClose={() => toggleShowDialog(false)}></SearchBookModal>
		</>
	);
}
