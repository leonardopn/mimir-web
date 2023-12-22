import { NewBookForm } from "@components/NewBookForm";
import { Card, Container } from "@chakra-ui/react";

export default function NewBook() {
	return (
		<Container className="max-w-screen-md flex items-center p-0">
			<Card className="p-4 w-full">
				<NewBookForm />
			</Card>
		</Container>
	);
}
