import { RHFInput } from "@components/Form/RHFInput";
import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import { isAxiosError } from "axios";
import { map } from "lodash";
import { SubmitHandler, useForm } from "react-hook-form";
import { IStepComponentDefaultProps } from "..";
import { googleBookToLocalBooks } from "../../../../helpers/ConverterTypes";
import { googleBooksResult } from "../../../../mock/googlebooks";
import { GetGoogleBooksApi, googleBooksApi } from "../../../../services/GoogleBooksAPI";

interface FormProps {
	author: string;
	title: string;
}

export function SearchBookStep1({ handleNextStep, setBooks }: IStepComponentDefaultProps) {
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
			const a = false;
			if (a) {
				const { data } = await googleBooksApi.get<GetGoogleBooksApi>("/", {
					params: {
						q,
						maxResults: 40,
					},
				});

				const convertedData = map(data.items, googleBookToLocalBooks);

				setBooks(convertedData);
			}
			setBooks(map(googleBooksResult.items || [], googleBookToLocalBooks));
			handleNextStep();
		} catch (err) {
			if (isAxiosError(err)) {
				console.error(err.response?.data);
			}
		}
	};

	return (
		<form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit(onSubmit)}>
			<Typography className="text-gray-600 text-center">
				Utilize as caixas de texto e procure seu livro por título e /ou autor
			</Typography>
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
		</form>
	);
}
