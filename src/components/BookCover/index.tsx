import { BookCoverDefault } from "@components/BookCoverDefault";
import { BookRibbonReadStatus } from "@components/BookRibbon/BookRibbonReadStatus";
import Image from "next/image";
import Link from "next/link";
import { tv } from "tailwind-variants";

interface BookCoverProps {
	readDate?: string | null;
	id: string;
	src?: string | null;
	title?: string;
	publisher?: string;
	alt?: string | null;
	disableLink?: boolean | null;
	showRibbon?: boolean;
}

const ContainerStyle = tv({
	base: "relative w-64 h-96",
	variants: {
		clickable: {
			true: "hover:scale-105 transition-transform cursor-pointer ",
		},
	},
});

export function BookCover({
	id,
	src,
	publisher,
	readDate,
	title,
	alt,
	disableLink,
	showRibbon = false,
}: BookCoverProps) {
	const srcToUse = src || "NOT_FOUND";

	const content = (
		<Image
			priority={true}
			src={srcToUse}
			alt={alt || "capa do livro"}
			width={250}
			height={400}
			className="rounded-xl shadow-md w-full h-full"></Image>
	);

	if (srcToUse === "NOT_FOUND")
		return <BookCoverDefault bookTitle={title} publisher={publisher} />;

	return (
		<div className={ContainerStyle({ clickable: !disableLink })}>
			{showRibbon && <BookRibbonReadStatus readDate={readDate}></BookRibbonReadStatus>}
			{disableLink ? (
				content
			) : (
				<Link href={`/books/${id}`} className="w-fit h-fit">
					{content}
				</Link>
			)}
		</div>
	);
}
