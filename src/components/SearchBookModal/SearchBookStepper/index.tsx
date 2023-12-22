import { Icon } from "@iconify/react";
import { Book } from "@typings/Book";
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";
import { useNumber } from "react-use";
import { SearchBookStep1 } from "./SearchBookStep1";
import { SearchBookStep2 } from "./SearchBookStep2";
import { SearchBookStep3 } from "./SearchBookStep3";
import {
	Box,
	Button,
	Divider,
	Step,
	StepDescription,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
	useSteps,
} from "@chakra-ui/react";

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

const steps = [
	{ title: "Buscar livros", description: "" },
	{ title: "Escolher livro", description: "" },
	{ title: "Finalizar", description: "" },
];

export function SearchBookStepper({ onConfirm, onCloseModal }: SearchBookStepperProps) {
	const { activeStep, goToNext, goToPrevious } = useSteps({
		index: 1,
		count: steps.length,
	});
	const [books, setBooks] = useState<Partial<Book>[]>([]);
	const [selectedBook, setSelectedBook] = useState<Partial<Book> | null>(null);

	const handleNextStep = useCallback(() => {
		goToNext();
	}, [goToNext]);

	const handlePreviousStep = useCallback(() => {
		goToPrevious();
	}, [goToPrevious]);

	const CurrentStep = useMemo(() => {
		switch (activeStep) {
			case 2:
				return SearchBookStep2;
			case 3:
				return SearchBookStep3;
			default:
				return SearchBookStep1;
		}
	}, [activeStep]);

	return (
		<div className="flex flex-col gap-4 min-h-full mb-6">
			<header className="flex flex-col sm:flex-row items-center gap-4 my-5">
				{activeStep !== 1 && (
					<Button
						className="h-10"
						onClick={handlePreviousStep}
						variant="outlined"
						leftIcon={<Icon icon="mdi:arrow-left-circle" />}>
						Voltar
					</Button>
				)}
				index={activeStep}
				<Stepper index={activeStep} className="flex-1 w-full">
					{steps.map((step, index) => (
						<Step key={index}>
							<StepIndicator>
								<StepStatus
									complete={<StepIcon />}
									incomplete={<StepNumber />}
									active={<StepNumber />}
								/>
							</StepIndicator>

							<Box flexShrink="0">
								<StepTitle>{step.title}</StepTitle>
								<StepDescription>{step.description}</StepDescription>
							</Box>

							<StepSeparator />
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
