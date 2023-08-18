import { NewBookForm } from "@components/NewBookForm";
import { Card, TextField } from "@mui/material";
import { useState } from "react";

export default function Books() {
	return (
		<Card className="p-4">
			<NewBookForm></NewBookForm>
		</Card>
	);
}
