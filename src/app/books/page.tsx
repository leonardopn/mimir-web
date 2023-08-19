import { NewBookForm } from "@components/NewBookForm";
import { Card, Container } from "@mui/material";

export default function Books() {
	return (
		<Container className="max-w-screen-md flex items-center p-0">
			<Card className="p-4 w-full">
				<NewBookForm></NewBookForm>
			</Card>
		</Container>
	);
}
