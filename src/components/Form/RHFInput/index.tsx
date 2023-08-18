import { FieldValue, FieldValues, UseControllerProps, useController } from "react-hook-form";

import { TextField, TextFieldProps } from "@mui/material";

type RHFInputProps<T extends FieldValues> = TextFieldProps & UseControllerProps<T>;

export function RHFInput<T extends FieldValues>({
	control,
	name,
	rules,
	defaultValue,
	shouldUnregister,
	...restProps
}: RHFInputProps<T>) {
	const {
		field,
		fieldState: { error },
	} = useController({ name, control, rules, defaultValue, shouldUnregister });

	return <TextField {...restProps} {...field}></TextField>;
}
