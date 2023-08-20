interface BookshelfPlankProps {}

export function BookshelfPlank({}: BookshelfPlankProps) {
	return (
		<div className="w-full ">
			<div className="w-full h-5 bg-yellow-800"></div>
			<div
				className="w-full h-4 bg-yellow-700"
				style={{ clipPath: "polygon(0 1%, 100% 0, 95% 100%, 5% 100%)" }}></div>
		</div>
	);
}
