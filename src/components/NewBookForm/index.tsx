"use client";

import { Button, Card, Collapse, Divider } from "@chakra-ui/react";
import { RHFAutoComplete } from "@components/Form/RHFAutoComplete";
import { RHFInput } from "@components/Form/RHFInput";
import { RHFTextArea } from "@components/Form/RHFTextArea";
import { SearchBookModal } from "@components/SearchBookModal";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBooks } from "@hooks/useBooks";
import { Book } from "@typings/Book";
import { Dayjs } from "dayjs";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToggle } from "react-use";
import { z } from "zod";
import FormProvider from "../../providers/FormProvider";
import { BookService, INewBookData } from "../../services/firebase/Book";
import { CoverArea } from "./CoverArea";

export interface NewBookFormProps
	extends Omit<Book, "id" | "createdAt" | "updatedAt" | "readDate" | "publishDate" | "cover"> {
	publishDate?: Dayjs;
	cover: File | null;
}

const FormSchema = z.object({
	title: z.string().min(1),
	publisher: z.string().min(1),
	author: z.array(z.string().min(1)).min(1),
	cover: z.any().optional(),
});

export function NewBookForm() {
	const { addBook } = useBooks();
	const [showDialog, toggleShowDialog] = useToggle(false);
	const [showUnnecessaryFields, toggleShowUnnecessaryFields] = useToggle(false);

	const methods = useForm<NewBookFormProps>({
		defaultValues: {
			title: "",
			description: "",
			author: [],
			cover: null,
			gender: [],
			isbn: "",
			isbn13: "",
			publishDate: "",
			publisher: "",
			tags: [],
		},
		resolver: zodResolver(FormSchema),
	});

	const { control, handleSubmit, reset, setValue } = methods;

	const onSubmit: SubmitHandler<NewBookFormProps> = async data => {
		const dataToCreate: INewBookData = {
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			author: data.author,
			description: data.description,
			gender: data.gender,
			isbn: data.isbn,
			isbn13: data.isbn13,
			publishDate: data.publishDate?.toDate().toISOString(),
			publisher: data.publisher,
			tags: data.tags,
			title: data.title,
			cover: data.cover,
			userId: "NtmnrIyP6NgiFn90i9TfLfOqegu1",
		};

		const bookInDB = await BookService.newBook(dataToCreate);
		addBook(bookInDB);
		reset();
	};

	function handleSetSearchedBookInForm(data: Partial<Book>) {
		console.log(data);
		data.author && setValue("author", [...data.author]);
		data.title && setValue("title", data.title);
	}

	return (
		<FormProvider
			className="grid grid-cols-1 gap-4 lg:grid-cols-3 w-full"
			methods={methods}
			onSubmit={handleSubmit(onSubmit)}>
			<CoverArea />
			<Card className="p-4 flex flex-col gap-3 lg:col-span-2 h-fit">
				<RHFInput control={control} name="title" label="Título" />
				<RHFInput control={control} name="publisher" label="Editora"></RHFInput>
				<RHFAutoComplete
					options={["32", "teste"]}
					control={control}
					name="author"
					freeSolo
					label="Autores"
				/>
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
				<DevTool control={control} />
			</Card>
			<SearchBookModal
				isOpen={showDialog}
				onConfirm={handleSetSearchedBookInForm}
				onClose={() => toggleShowDialog(false)}></SearchBookModal>
		</FormProvider>
	);
}
