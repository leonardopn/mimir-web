import { Container } from "@chakra-ui/react";
import { NewBookForm } from "@components/NewBookForm";

export default function NewBook() {
	return (
		<Container className="max-w-screen-lg flex items-center p-0">
			<NewBookForm />
		</Container>
	);
}
