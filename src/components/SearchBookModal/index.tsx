import { useResponsive } from "@hooks/useResponsive";
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	ModalProps,
} from "@chakra-ui/react";
import { Book } from "@typings/Book";
import { SearchBookStepper } from "./SearchBookStepper";

interface SearchBookModalProps extends Omit<ModalProps, "children"> {
	onConfirm: (data: Partial<Book>) => void;
}

export function SearchBookModal({ onClose, onConfirm, ...restProps }: SearchBookModalProps) {
	const { isUpSm } = useResponsive();

	return (
		<Modal {...restProps} size={isUpSm ? "md" : "full"} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader className="flex justify-between items-center">
					<ModalHeader sx={{ m: 0, p: 2 }} id="customized-dialog-title">
						Busque um livro
					</ModalHeader>
					<ModalCloseButton></ModalCloseButton>
				</ModalHeader>
				<ModalBody>
					<SearchBookStepper
						onConfirm={onConfirm}
						onCloseModal={onClose}></SearchBookStepper>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
