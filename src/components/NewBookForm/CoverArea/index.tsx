import { Button, Card, IconButton } from "@chakra-ui/react";
import { BookCover } from "@components/BookCover";
import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import { useController, useWatch } from "react-hook-form";
import { NewBookFormProps } from "..";

interface CoverAreaProps {}

export function CoverArea({}: CoverAreaProps) {
	const { title, publisher } = useWatch<NewBookFormProps>();
	const inputFileRef = useRef<HTMLInputElement | null>(null);
	const [imageSrc, setImageSrc] = useState("");

	const {
		field: { onChange: onBookCoverChange },
	} = useController<NewBookFormProps>({ name: "cover" });

	function handleChangeCover() {
		const file = inputFileRef.current?.files?.item(0);
		let newImageUrl = "";

		if (file) {
			newImageUrl = URL.createObjectURL(file);
		}

		setImageSrc(oldState => {
			URL.revokeObjectURL(oldState);
			return newImageUrl;
		});

		if (inputFileRef.current) {
			inputFileRef.current.files = null;
			inputFileRef.current.value = "";
		}

		onBookCoverChange(file || null);
	}

	function handleOpenFileDialog() {
		inputFileRef.current?.click();
	}

	function handleRemoveSrc() {
		onBookCoverChange(null);
		setImageSrc(oldState => {
			URL.revokeObjectURL(oldState);
			return "";
		});
	}

	const hasImage = !!imageSrc;

	return (
		<Card className="p-4 flex flex-col items-center gap-5 h-fit lg:sticky lg:top-24 overflow-auto">
			<BookCover disableLink id="" title={title} publisher={publisher} src={imageSrc} />
			<section className="flex gap-2 w-full">
				{hasImage && (
					<IconButton aria-label="botão excluir" onClick={handleRemoveSrc}>
						<Icon icon="mdi:trash"></Icon>
					</IconButton>
				)}
				<Button className="flex-1" variant="outline" onClick={handleOpenFileDialog}>
					{hasImage ? "Mudar capa" : "Adicionar capa"}
				</Button>
			</section>
			<input
				accept="image/*"
				type="file"
				ref={inputFileRef}
				className="hidden"
				onChange={handleChangeCover}></input>
		</Card>
	);
}
