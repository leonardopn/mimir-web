import { Book } from "@typings/Book";
import Image from "next/image";
import Link from "next/link";
import { tv } from "tailwind-variants";

interface BookCoverProps {
	data: Book;
	alt?: string;
	disableLink?: boolean;
}

const coverStyle = tv({
	base: "rounded-xl shadow-xl ",
	variants: {
		clickable: {
			true: "hover:scale-105 transition-transform cursor-pointer",
		},
	},
});

export function BookCover({ data, alt, disableLink }: BookCoverProps) {
	const srcToUse = data.cover?.url || "/book-cover-placeholder.png";

	const content = (
		<Image
			priority={true}
			src={srcToUse}
			alt={alt || "capa do livro"}
			width={250}
			height={400}
			className={coverStyle({ clickable: !disableLink })}></Image>
	);

	if (disableLink) {
		return content;
	}

	return (
		<Link href={`/books/${data.id}`} className="w-fit h-fit">
			{content}
		</Link>
	);
}
