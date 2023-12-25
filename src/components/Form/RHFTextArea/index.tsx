import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Textarea,
	TextareaProps,
} from "@chakra-ui/react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";

type RHFTextAreaProps<T extends FieldValues> = TextareaProps &
	UseControllerProps<T> & {
		label: string;
	};

export function RHFTextArea<T extends FieldValues>({
	control,
	name,
	rules,
	defaultValue,
	shouldUnregister,
	label,
	isRequired,
	...restProps
}: RHFTextAreaProps<T>) {
	const {
		field,
		fieldState: { error },
	} = useController({ name, control, rules, defaultValue, shouldUnregister });

	return (
		<FormControl isRequired={isRequired}>
			{!!label && <FormLabel>{label}</FormLabel>}
			<Textarea {...restProps} {...field} />
			{!!error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
		</FormControl>
	);
}
