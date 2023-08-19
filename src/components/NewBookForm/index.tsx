"use client";

import { RHFDatePicker } from "@components/Form/RHFDatePicker";
import { RHFInput } from "@components/Form/RHFInput";
import { RHFSelector } from "@components/Form/RHFSelector";
import { Button, IconButton } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Book } from "@typings/Book";
import { Dayjs } from "dayjs";
import { SubmitHandler, useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface FormProps
	extends Omit<Book, "id" | "createdAt" | "updatedAt" | "readDate" | "publishDate" | "cover"> {
	publishDate: Dayjs | null;
	cover: FileList | null;
}

export function NewBookForm() {
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

	const onSubmit: SubmitHandler<FormProps> = data => {
		console.log(data);
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
			<div className="flex gap-1 justify-between items-center">
				<input type="file" accept="image/png, image/jpeg" {...register("cover")}></input>
				{!!cover && (
					<IconButton onClick={handleResetCover} color="error" size="small">
						<Icon icon="mdi:close-circle"></Icon>
					</IconButton>
				)}
			</div>
			{!!coverUrl && (
				<div className="flex justify-center items-center">
					<Image src={coverUrl} width={300} height={300} alt="book cover"></Image>
				</div>
			)}
			<Button type="submit" variant="contained">
				Salvar
			</Button>
		</form>
	);
}
