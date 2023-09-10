import { Icon } from "@iconify/react";
import { Typography } from "@mui/material";
import { Book } from "@typings/Book";
import dayjs from "dayjs";
import Image from "next/image";
import { useMemo } from "react";

interface IBookApiResultData extends Partial<Book> {}

interface BookApiResultProps {
	data: IBookApiResultData;
	onClick?: (data: IBookApiResultData) => void;
}

export function BookApiResult({ data, onClick }: BookApiResultProps) {
	const dataToUse = useMemo(() => {
		if (data.publishDate) {
			return dayjs(data.publishDate).format("DD/MM/YYYY");
		}
		return "Não consta";
	}, [data.publishDate]);

	return (
		<div
			className="flex flex-col sm:flex-row bg-gray-100 rounded-lg shadow-lg max-h-[500px] sm:max-h-56 cursor-pointer hover:shadow-xl transition-shadow items-center sm:items-stretch"
			onClick={() => onClick && onClick(data)}>
			{!!data.cover?.url && (
				<Image
					src={data.cover.url}
					alt={"capa_do_livro"}
					width={144}
					height={224}
					className="sm:rounded-l-lg rounded-lg mt-5 sm:mt-0"
				/>
			)}
			<div className="m-5 text-gray-500 overflow-auto flex flex-col gap-2">
				<div className="relative top-0 bg-gray-100 sm:sticky flex gap-1 items-center flex-wrap">
					<Typography className="font-bold text-lg text-gray-700 ">
						{data.title}
					</Typography>
					<Typography className="text-xs ">{`(${data.author?.join(", ")})`}</Typography>
				</div>
				<div className="grid grid-cols-2">
					<Typography>
						<Icon icon="ion:library" inline className="text-gray-700" />{" "}
						{data.publisher || "Não consta"}
					</Typography>

					<Typography>
						<Icon icon="ion:calendar" inline className="text-gray-700" /> {dataToUse}
					</Typography>

					{!!data?.isbn && (
						<Typography>
							<Icon icon="mdi:barcode" inline className="text-gray-700" /> {data.isbn}
						</Typography>
					)}
					{!!data?.isbn13 && (
						<Typography>
							<Icon icon="mdi:barcode" inline className="text-gray-700" />{" "}
							{data.isbn13}
						</Typography>
					)}
				</div>
				{!!data?.description && (
					<Typography>
						<Icon icon="mdi:comment-text" inline className="text-gray-700" />{" "}
						{data?.description}
					</Typography>
				)}
			</div>
		</div>
	);
}
