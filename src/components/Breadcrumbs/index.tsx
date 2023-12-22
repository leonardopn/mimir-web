import { Link } from "@chakra-ui/next-js";
import {
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbProps as ChakraBreadcrumbProps,
	Breadcrumb as ChakraBreadcrumbs,
} from "@chakra-ui/react";

interface BreadcrumbLink {
	label: string;
	href?: string;
	icon?: string;
}

interface BreadcrumbsProps extends ChakraBreadcrumbProps {
	links: BreadcrumbLink[];
}

export function Breadcrumbs({ links, ...restProps }: BreadcrumbsProps) {
	function isCurrent(index: number) {
		return links.length === index + 1;
	}

	return (
		<ChakraBreadcrumbs {...restProps}>
			{links.map((link, index) => (
				<BreadcrumbItem key={index} isCurrentPage={isCurrent(index)}>
					<BreadcrumbLink
						className={`${isCurrent(index) ? "text-gray-500" : ""}`}
						as={isCurrent(index) ? undefined : Link}
						href={link?.href || "#"}>
						{link.label}
					</BreadcrumbLink>
				</BreadcrumbItem>
			))}
		</ChakraBreadcrumbs>
	);
}
