import { ReactNode } from "react";
import { FormProvider as Form, UseFormReturn } from "react-hook-form";

interface FormProviderProps {
	children: ReactNode;
	methods: UseFormReturn<any>;
	onSubmit?: VoidFunction;
	className?: string;
}

export default function FormProvider({
	children,
	onSubmit,
	methods,
	className,
}: FormProviderProps) {
	return (
		<Form {...methods}>
			<form onSubmit={onSubmit} className={className}>
				{children}
			</form>
		</Form>
	);
}
