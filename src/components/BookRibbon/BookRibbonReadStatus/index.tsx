import dayjs from "dayjs";
import { BookRibbon } from "..";
import { Tooltip } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

interface BookRibbonReadStatusProps {
	readDate: Date | null;
}

export function BookRibbonReadStatus({ readDate }: BookRibbonReadStatusProps) {
	const tooltipText = readDate
		? `Lido em: ${dayjs(readDate).format("ddd, DD MMM YYYY")}`
		: "Não lido";
	const icon = readDate ? "mdi:check-decagram" : "mdi:alert-decagram";
	const color: [string, string] | undefined = readDate ? undefined : ["bg-red-500", "bg-red-600"];

	return (
		<BookRibbon color={color}>
			<Tooltip title={tooltipText} hasArrow>
				<Icon icon={icon} className="text-white h-5 w-5 mb-2" />
			</Tooltip>
		</BookRibbon>
	);
}
