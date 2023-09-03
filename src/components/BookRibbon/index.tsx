import { ReactNode } from "react";

interface BookRibbonProps {
	children?: ReactNode;
	color?: [string, string];
}

export function BookRibbon({
	color = ["bg-emerald-500", "bg-emerald-600"],
	children,
}: BookRibbonProps) {
	return (
		<span className="absolute left-5 -top-2">
			<div
				className={`h-16 w-8 flex justify-center items-center ${color[0]}`}
				style={{
					clipPath: "polygon(100% 0, 100% 50%, 100% 100%, 50% 75%, 0 100%, 0% 0%)",
				}}>
				{children}
			</div>
			<div
				className={`h-2 w-2 absolute top-0 -right-[0.49rem] ${color[1]}`}
				style={{ clipPath: "polygon(0 0, 0 0, 100% 100%, 0% 100%)" }}></div>
		</span>
	);
}
