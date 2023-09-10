import { RHFInput } from "@components/Form/RHFInput";
import { LoadingButton } from "@mui/lab";
import { isAxiosError } from "axios";
import { Fragment, useCallback, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNumber, useToggle } from "react-use";
import { GetGoogleBooksApi, googleBooksApi } from "../../../services/GoogleBooksAPI";
import { googleBooksResult } from "../../../mock/googlebooks";
import { BookApiResult } from "@components/BookApiResult";
import { googleBookToLocalBooks } from "../../../helpers/ConverterTypes";
import { SearchBookStep1 } from "./SearchBookStep1";
import { Button, Divider, Step, StepLabel, Stepper } from "@mui/material";
import { Icon } from "@iconify/react";

interface SearchBookStepperProps {}

interface FormProps {
	author: string;
	title: string;
}

const steps = ["Buscar livros", "Escolher livro", "Finalizar"];

export function SearchBookStepper({}: SearchBookStepperProps) {
	const [step, { dec, inc }] = useNumber(1, 3, 1);

	const handleNextStep = useCallback(() => {
		inc();
	}, [inc]);

	const handlePreviousStep = useCallback(() => {
		dec();
	}, [dec]);

	const CurrentStep = useMemo(() => {
		switch (step) {
			default:
				return SearchBookStep1;
		}
	}, [step]);

	return (
		<div className="grid grid-cols-1 gap-4">
			<header className="flex flex-col sm:flex-row items-center gap-4 my-5">
				{step !== 1 && (
					<Button
						className="h-10"
						onClick={handlePreviousStep}
						variant="outlined"
						startIcon={<Icon icon="mdi:arrow-left-circle" />}>
						Voltar
					</Button>
				)}
				<Stepper activeStep={step - 1} alternativeLabel className="flex-1 w-full">
					{steps.map(label => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
			</header>

			<CurrentStep />
		</div>
	);
}
