import { BookApiResult } from "@components/BookApiResult";
import { IStepComponentDefaultProps } from "..";
import { Button, Text } from "@chakra-ui/react";

export function SearchBookStep3({
	selectedBook,
	handlePreviousStep,
	onConfirm,
	onCloseModal,
}: IStepComponentDefaultProps) {
	function handleConfirmSelection() {
		if (selectedBook) {
			onConfirm(selectedBook);
			onCloseModal();
		}
	}

	if (!selectedBook) return null;

	return (
		<div className="flex flex-col gap-10">
			<main className="flex flex-col gap-5">
				<Text className="text-gray-800 text-center font-bold text-xl">
					Você selecionou este livro:
				</Text>
				<BookApiResult data={selectedBook}></BookApiResult>
			</main>
			<footer className="flex flex-col gap-5">
				<Text className="text-gray-800 text-center font-bold text-xl">
					Deseja utilizo-lo?
				</Text>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
					<Button color="error" variant="contained" onClick={handlePreviousStep}>
						Não
					</Button>
					<Button color="success" variant="contained" onClick={handleConfirmSelection}>
						Sim
					</Button>
				</div>
			</footer>
		</div>
	);
}
