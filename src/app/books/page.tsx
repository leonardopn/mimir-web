import { BooksPageList } from "@components/BooksPageList";
import { FloatingAddButton } from "@components/FloatingAddButton";
import { Container } from "@mui/material";

export default function Books() {
	return (
		<Container className="max-w-screen-xl flex flex-1 w-full items-center justify-center">
			<BooksPageList></BooksPageList>
			<FloatingAddButton tip="Adicionar livro" link="/books/new"></FloatingAddButton>
		</Container>
	);
}
