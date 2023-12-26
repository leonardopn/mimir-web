import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from "@chakra-ui/react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";

type RHFInputProps<T extends FieldValues> = InputProps &
	UseControllerProps<T> & {
		label: string;
	};

export function RHFInput<T extends FieldValues>({
	control,
	name,
	rules,
	defaultValue,
	shouldUnregister,
	label,
	isRequired,
	...restProps
}: RHFInputProps<T>) {
	const {
		field,
		fieldState: { error },
	} = useController({ name, control, rules, defaultValue, shouldUnregister });

	return (
		<FormControl isRequired={isRequired} isInvalid={!!error}>
			{!!label && <FormLabel>{label}</FormLabel>}
			<Input {...restProps} {...field} isInvalid={!!error} />
			{!!error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
		</FormControl>
	);
}
