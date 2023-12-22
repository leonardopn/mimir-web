import { BookRibbonReadStatus } from "@components/BookRibbon/BookRibbonReadStatus";
import { Book } from "@typings/Book";
import Image from "next/image";
import Link from "next/link";
import { tv } from "tailwind-variants";

interface BookCoverProps {
	data: Book;
	alt?: string;
	disableLink?: boolean;
}

const ContainerStyle = tv({
	base: "relative w-64 h-96",
	variants: {
		clickable: {
			true: "hover:scale-105 transition-transform cursor-pointer ",
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
			className="rounded-xl shadow-xl w-full h-full"></Image>
	);

	return (
		<div className={ContainerStyle({ clickable: !disableLink })}>
			<BookRibbonReadStatus readDate={data.readDate}></BookRibbonReadStatus>
			{disableLink ? (
				content
			) : (
				<Link href={`/books/${data.id}`} className="w-fit h-fit">
					{content}
				</Link>
			)}
		</div>
	);
}
