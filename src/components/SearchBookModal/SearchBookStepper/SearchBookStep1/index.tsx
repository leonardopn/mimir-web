import { RHFInput } from "@components/Form/RHFInput";
import { LoadingButton } from "@mui/lab";
import { isAxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { GetGoogleBooksApi, googleBooksApi } from "../../../../services/GoogleBooksAPI";
import { Typography } from "@mui/material";
import { map } from "lodash";
import { googleBookToLocalBooks } from "../../../../helpers/ConverterTypes";
import { IStepComponentDefaultProps } from "..";

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

			const { data } = await googleBooksApi.get<GetGoogleBooksApi>("/", {
				params: {
					q,
					maxResults: 40,
				},
			});

			const convertedData = map(data.items, googleBookToLocalBooks);

			setBooks(convertedData);
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
