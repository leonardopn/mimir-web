import { RHFInput } from "@components/Form/RHFInput";
import { LoadingButton } from "@mui/lab";
import { isAxiosError } from "axios";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToggle } from "react-use";
import { GetGoogleBooksApi, googleBooksApi } from "../../../services/GoogleBooksAPI";
import { googleBooksResult } from "../../../mock/googlebooks";
import { BookApiResult } from "@components/BookApiResult";

interface SearchBookStepProps {}

interface FormProps {
	author: string;
	title: string;
}

export function SearchBookStep({}: SearchBookStepProps) {
	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isDirty },
	} = useForm<FormProps>({
		defaultValues: {
			author: "",
			title: "",
		},
	});

	const onSubmit: SubmitHandler<FormProps> = async formData => {
		try {
			const qToAuth = formData.author ? `inauthor:${formData.author}` : undefined;
			const qToTitle = formData.title ? `intitle:${formData.title}` : undefined;
			const qs = [qToAuth, qToTitle].filter(Boolean);
			const q = qs.join("+");

			const { data } = await googleBooksApi.get<GetGoogleBooksApi>("/", {
				params: {
					q,
					maxResults: 40,
				},
			});

			console.log(data);
		} catch (err) {
			if (isAxiosError(err)) {
				console.error(err.response?.data);
			}
		}
	};

	return (
		<form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit(onSubmit)}>
			<RHFInput
				control={control}
				name="title"
				placeholder="Harry Potter"
				label="Título do livro"
			/>
			<RHFInput control={control} name="author" placeholder="J. K. Rowling" label="Autor" />
			<LoadingButton
				type="submit"
				variant="contained"
				size="large"
				loading={isSubmitting}
				disabled={!isDirty}>
				Buscar
			</LoadingButton>

			{googleBooksResult.items?.map((item, index) => {
				return <BookApiResult key={item.id ? item.id + index : index} data={item} />;
			})}
		</form>
	);
}
