import { Input, InputProps } from "@chakra-ui/react";
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
	...restProps
}: RHFInputProps<T>) {
	const {
		field,
		fieldState: { error },
	} = useController({ name, control, rules, defaultValue, shouldUnregister });

	return <Input {...restProps} {...field}></Input>;
}
