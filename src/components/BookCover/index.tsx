import Image from "next/image";

interface BookCoverProps {
	src: string | null;
	alt?: string;
}

export function BookCover({ src, alt }: BookCoverProps) {
	const srcToUse = src || "/book-cover-placeholder.png";

	return (
		<div className="">
			<Image
				src={srcToUse}
				alt={alt || "capa do livro"}
				width={250}
				height={400}
				className="rounded-xl shadow-xl"></Image>
		</div>
	);
}
