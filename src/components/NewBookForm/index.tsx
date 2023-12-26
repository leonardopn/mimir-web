"use client";

import { RHFInput } from "@components/Form/RHFInput";
import { RHFSelector } from "@components/Form/RHFSelector";
import { useBooks } from "@hooks/useBooks";
import { Icon } from "@iconify/react";
import { Book } from "@typings/Book";
import { Dayjs } from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BookService } from "../../services/firebase/Book";
import { SearchBookModal } from "@components/SearchBookModal";
import { useToggle } from "react-use";
import { DevTool } from "@hookform/devtools";
import { Button, Collapse, Divider, IconButton } from "@chakra-ui/react";
import { RHFTextArea } from "@components/Form/RHFTextArea";
import { RHFAutoComplete } from "@components/Form/RHFAutoComplete";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormProps
	extends Omit<Book, "id" | "createdAt" | "updatedAt" | "readDate" | "publishDate" | "cover"> {
	publishDate: Dayjs | null;
	cover: FileList | null;
}

const FormSchema = z.object({
	title: z.string().min(1),
});

export function NewBookForm() {
	const { addBook } = useBooks();
	const [showDialog, toggleShowDialog] = useToggle(false);
	const [showUnnecessaryFields, toggleShowUnnecessaryFields] = useToggle(false);
	const [coverUrl, setCoverUrl] = useState("");

	const { control, handleSubmit, register, resetField, watch, setValue } = useForm<FormProps>({
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
		resolver: zodResolver(FormSchema),
	});

	const cover = watch("cover");

	function handleResetCover() {
		resetField("cover");
		setCoverUrl("");
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

	function handleSetSearchedBookInForm(data: Partial<Book<"LOCAL">>) {
		console.log(data);
		data.author && setValue("author", [...data.author]);
		data.title && setValue("title", data.title);
	}

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
				<RHFInput control={control} name="title" label="Título" />
				<RHFInput control={control} name="publisher" label="Editora"></RHFInput>
				<RHFAutoComplete
					options={["32", "teste"]}
					control={control}
					name="author"
					freeSolo
					label="Autores"
				/>
				<div className="flex gap-1 justify-between items-center">
					<input
						type="file"
						accept="image/png, image/jpeg"
						{...register("cover")}></input>
					{!!cover && (
						<IconButton
							onClick={handleResetCover}
							colorScheme="red"
							size="small"
							aria-label={"button remove image"}>
							<Icon icon="mdi:close-circle"></Icon>
						</IconButton>
					)}
				</div>
				{!!coverUrl && (
					<div className="flex justify-center items-center">
						<Image src={coverUrl} width={300} height={500} alt="book cover"></Image>
					</div>
				)}
				<Divider />
				<Button onClick={toggleShowUnnecessaryFields} variant="outline">
					Preencher dados complementares
				</Button>
				<Collapse in={showUnnecessaryFields} animateOpacity>
					<section className="grid grid-cols-1 gap-4">
						<RHFInput control={control} name="isbn" label="ISBN"></RHFInput>
						<RHFInput control={control} name="isbn13" label="ISBN13"></RHFInput>
						<RHFAutoComplete control={control} name="gender" freeSolo label="Gêneros" />

						<RHFTextArea control={control} name="description" label="Descrição" />
					</section>
				</Collapse>
				<Divider />
				<footer className="grid grid-cols-1 gap-2 sm:grid-cols-2">
					<Button onClick={toggleShowDialog} colorScheme="blue">
						Buscar livro
					</Button>
					<Button type="submit">Salvar</Button>
				</footer>
				<DevTool control={control} /> {/* set up the dev tool */}
			</form>
			<SearchBookModal
				isOpen={showDialog}
				onConfirm={handleSetSearchedBookInForm}
				onClose={() => toggleShowDialog(false)}></SearchBookModal>
		</>
	);
}
