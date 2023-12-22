import {
	Breadcrumb as ChakraBreadcrumbs,
	BreadcrumbProps as ChakraBreadcrumbProps,
	BreadcrumbItem,
	BreadcrumbLink,
} from "@chakra-ui/react";
import Link from "next/link";

interface BreadcrumbLink {
	label: string;
	href?: string;
	icon?: string;
}

interface BreadcrumbsProps extends ChakraBreadcrumbProps {
	links: BreadcrumbLink[];
}

export function Breadcrumbs({ links, ...restProps }: BreadcrumbsProps) {
	return (
		<ChakraBreadcrumbs className="" {...restProps}>
			<BreadcrumbItem>
				{links.map((link, index) =>
					link.href ? (
						<BreadcrumbLink
							as={Link}
							key={index}
							href={link.href || ""}
							className={`no-underline  hover:underline ${
								links.length === index + 1 ? "text-gray-500" : "text-gray-700"
							}`}>
							{link.label}
						</BreadcrumbLink>
					) : (
						<span
							key={index}
							className={` ${
								links.length === index + 1 ? "text-gray-500" : "text-gray-700"
							}`}>
							{link.label}
						</span>
					)
				)}
			</BreadcrumbItem>
		</ChakraBreadcrumbs>
	);
}
