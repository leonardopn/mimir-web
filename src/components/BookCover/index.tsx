import { Book } from "@typings/Book";
import Image from "next/image";
import Link from "next/link";

interface BookCoverProps {
	data: Book;
	alt?: string;
}

export function BookCover({ data, alt }: BookCoverProps) {
	const srcToUse = data.cover || "/book-cover-placeholder.png";

	return (
		<Link href={`/books/${data.id}`}>
			<div className="cursor-pointer">
				<Image
					src={srcToUse}
					alt={alt || "capa do livro"}
					width={250}
					height={400}
					className="rounded-xl shadow-xl hover:scale-105 transition-transform"></Image>
			</div>
		</Link>
	);
}
