import { Icon } from "@iconify/react";
import { Button, Divider, Step, StepLabel, Stepper } from "@mui/material";
import { Book } from "@typings/Book";
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";
import { useNumber } from "react-use";
import { SearchBookStep1 } from "./SearchBookStep1";
import { SearchBookStep2 } from "./SearchBookStep2";
import { SearchBookStep3 } from "./SearchBookStep3";

interface SearchBookStepperProps {
	onConfirm: (data: Partial<Book>) => void;
	onCloseModal: VoidFunction;
}

export interface IStepComponentDefaultProps {
	handleNextStep: () => void;
	handlePreviousStep: () => void;
	setBooks: Dispatch<SetStateAction<Partial<Book<"LOCAL">>[]>>;
	setSelectedBook: Dispatch<SetStateAction<Partial<Book<"LOCAL">> | null>>;
	onConfirm: (data: Partial<Book>) => void;
	onCloseModal: VoidFunction;
	books: Partial<Book<"LOCAL">>[];
	selectedBook: Partial<Book<"LOCAL">> | null;
}

const steps = ["Buscar livros", "Escolher livro", "Finalizar"];

export function SearchBookStepper({ onConfirm, onCloseModal }: SearchBookStepperProps) {
	const [step, { dec, inc }] = useNumber(1, 3, 1);
	const [books, setBooks] = useState<Partial<Book>[]>([]);
	const [selectedBook, setSelectedBook] = useState<Partial<Book> | null>(null);

	const handleNextStep = useCallback(() => {
		inc();
	}, [inc]);

	const handlePreviousStep = useCallback(() => {
		dec();
	}, [dec]);

	const CurrentStep = useMemo(() => {
		switch (step) {
			case 2:
				return SearchBookStep2;
			case 3:
				return SearchBookStep3;
			default:
				return SearchBookStep1;
		}
	}, [step]);

	return (
		<div className="flex flex-col gap-4 min-h-full mb-6">
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
			<Divider></Divider>
			<CurrentStep
				handleNextStep={handleNextStep}
				handlePreviousStep={handlePreviousStep}
				setBooks={setBooks}
				setSelectedBook={setSelectedBook}
				onCloseModal={onCloseModal}
				onConfirm={onConfirm}
				books={books}
				selectedBook={selectedBook}
			/>
		</div>
	);
}
