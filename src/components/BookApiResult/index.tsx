import { Typography } from "@mui/material";
import { IGoogleBooksApi } from "../../services/GoogleBooksAPI";
import Image from "next/image";
import { useMemo } from "react";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";

interface BookApiResultProps {
	data: IGoogleBooksApi;
}

export function BookApiResult({ data }: BookApiResultProps) {
	const { volumeInfo } = data;

	const imageToUse =
		volumeInfo?.imageLinks?.thumbnail || volumeInfo?.imageLinks?.smallThumbnail || "";

	const isbn = useMemo(() => {
		let v10: string | null = null;
		let v13: string | null = null;

		volumeInfo?.industryIdentifiers?.forEach(isbnVariant => {
			if (isbnVariant.type && isbnVariant.identifier) {
				switch (isbnVariant.type) {
					case "ISBN_13":
						v13 = isbnVariant.identifier;
						break;
					case "ISBN_10":
						v10 = isbnVariant.identifier;
						break;
				}
			}
		});

		return { v10, v13 };
	}, [volumeInfo?.industryIdentifiers]);

	const dataToUse = useMemo(() => {
		if (volumeInfo?.publishedDate) {
			return dayjs(volumeInfo?.publishedDate).format("DD/MM/YYYY");
		}
		return "Não consta";
	}, [volumeInfo?.publishedDate]);

	return (
		<div className="flex flex-col sm:flex-row bg-gray-100 rounded-lg shadow-lg max-h-[500px] sm:max-h-56 cursor-pointer hover:shadow-xl transition-shadow items-center sm:items-stretch">
			{!!imageToUse && (
				<Image
					src={imageToUse}
					alt={"capa_do_livro"}
					width={144}
					height={224}
					className="sm:rounded-l-lg rounded-lg mt-5 sm:mt-0"
				/>
			)}
			<div className="m-5 text-gray-500 overflow-auto flex flex-col gap-2">
				<div className="relative top-0 bg-gray-100 sm:sticky flex gap-1 items-center flex-wrap">
					<Typography className="font-bold text-lg text-gray-700 ">
						{volumeInfo?.title}
					</Typography>
					<Typography className="text-xs ">{`(${volumeInfo?.authors?.join(
						", "
					)})`}</Typography>
				</div>
				<div className="grid grid-cols-2">
					<Typography>
						<Icon icon="ion:library" inline className="text-gray-700" />{" "}
						{volumeInfo?.publisher || "Não consta"}
					</Typography>

					<Typography>
						<Icon icon="ion:calendar" inline className="text-gray-700" /> {dataToUse}
					</Typography>

					{!!isbn.v10 && (
						<Typography>
							<Icon icon="mdi:barcode" inline className="text-gray-700" /> {isbn.v10}
						</Typography>
					)}
					{!!isbn.v13 && (
						<Typography>
							<Icon icon="mdi:barcode" inline className="text-gray-700" /> {isbn.v13}
						</Typography>
					)}
				</div>
				{!!volumeInfo?.description && (
					<Typography>
						<Icon icon="mdi:comment-text" inline className="text-gray-700" />{" "}
						{volumeInfo?.description}
					</Typography>
				)}
			</div>
		</div>
	);
}
