import { FormControl, FormErrorMessage, FormLabel, Select, SelectProps } from "@chakra-ui/react";
import { FieldValues, Path, PathValue, UseControllerProps, useController } from "react-hook-form";

type RHFSelectorProps<T extends FieldValues> = SelectProps &
	UseControllerProps<T> & { options: PathValue<T, Path<T>>[]; label?: string };

export function RHFSelector<T extends FieldValues>({
	control,
	name,
	rules,
	defaultValue,
	shouldUnregister,
	label,
	options,
	isRequired,
	...restProps
}: RHFSelectorProps<T>) {
	const {
		field,
		fieldState: { error },
	} = useController({ name, control, rules, defaultValue, shouldUnregister });

	return (
		<FormControl isRequired={isRequired}>
			{!!label && <FormLabel>{label}</FormLabel>}
			<Select
				onChange={field.onChange}
				onBlur={field.onBlur}
				value={field.value}
				{...restProps}>
				{options.map((option, index) => {
					return (
						<option value={option} key={index}>
							{option}
						</option>
					);
				})}
			</Select>
			{!!error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
		</FormControl>
	);
}
