import { BooksPageList } from "@components/BooksPageList";
import { Container } from "@mui/material";

export default function Books() {
	return (
		<Container className="max-w-screen-xl flex items-center p-0">
			<BooksPageList></BooksPageList>
		</Container>
	);
}
