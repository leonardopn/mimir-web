import { useResponsive } from "@hooks/useResponsive";
import { Icon } from "@iconify/react";
import { Dialog, DialogProps, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { SearchBookStepper } from "./SearchBookStepper";
import { Book } from "@typings/Book";

interface SearchBookModalProps extends DialogProps {
	onConfirm: (data: Partial<Book>) => void;
}

export function SearchBookModal({ onClose, onConfirm, ...restProps }: SearchBookModalProps) {
	const { isUpSm } = useResponsive();

	return (
		<Dialog
			{...restProps}
			maxWidth="md"
			fullWidth
			fullScreen={!isUpSm}
			className="z-[99999]"
			onClose={onClose}>
			<header className="flex justify-between items-center">
				<DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
					Busque um livro
				</DialogTitle>
				<IconButton className="mr-2" onClick={e => onClose && onClose(e, "escapeKeyDown")}>
					<Icon icon="mdi:close"></Icon>
				</IconButton>
			</header>
			<DialogContent dividers>
				<SearchBookStepper
					onConfirm={onConfirm}
					onCloseModal={() =>
						onClose && onClose({}, "escapeKeyDown")
					}></SearchBookStepper>
			</DialogContent>
		</Dialog>
	);
}
