import { FieldValues, UseControllerProps, useController } from "react-hook-form";

import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";

type RHFDatePickerProps<T extends FieldValues> = DatePickerProps<T> & UseControllerProps<T>;

export function RHFDatePicker<T extends FieldValues>({
	control,
	name,
	rules,
	defaultValue,
	shouldUnregister,
	...restProps
}: RHFDatePickerProps<T>) {
	const {
		field,
		fieldState: { error },
	} = useController({ name, control, rules, defaultValue, shouldUnregister });

	return <DatePicker {...restProps} {...field}></DatePicker>;
}
