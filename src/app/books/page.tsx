import { BooksPageList } from "@components/BooksPageList";
import { FloatingAddButton } from "@components/FloatingAddButton";
import { Container } from "@chakra-ui/react";

export default function Books() {
	return (
		<Container className="max-w-screen-xl flex flex-1 w-full">
			<BooksPageList></BooksPageList>
			<FloatingAddButton tip="Adicionar livro" link="/books/new"></FloatingAddButton>
		</Container>
	);
}
