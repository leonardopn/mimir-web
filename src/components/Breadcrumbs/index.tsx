import MUIBreadcrumbs, { BreadcrumbsProps as MUIBreadcrumbsProps } from "@mui/material/Breadcrumbs";
import Link from "next/link";

interface BreadcrumbLink {
	label: string;
	href?: string;
	icon?: string;
}

interface BreadcrumbsProps extends MUIBreadcrumbsProps {
	links: BreadcrumbLink[];
}

export function Breadcrumbs({ links, ...restProps }: BreadcrumbsProps) {
	return (
		<MUIBreadcrumbs className="" {...restProps}>
			{links.map((link, index) =>
				link.href ? (
					<Link
						key={index}
						href={link.href || ""}
						className={`no-underline  hover:underline ${
							links.length === index + 1 ? "text-gray-500" : "text-gray-700"
						}`}>
						{link.label}
					</Link>
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
		</MUIBreadcrumbs>
	);
}
