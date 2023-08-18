import { Autocomplete, AutocompleteProps, Chip, TextField, TextFieldProps } from "@mui/material";
import { FieldValues, Path, PathValue, UseControllerProps, useController } from "react-hook-form";

type RHFSelectorProps<T extends FieldValues> = Omit<
	AutocompleteProps<PathValue<T, Path<T>>, boolean, boolean, boolean>,
	"renderInput"
> &
	UseControllerProps<T> & {
		textFieldProps?: TextFieldProps;
	};

export function RHFSelector<T extends FieldValues>({
	name,
	control,
	rules,
	defaultValue,
	shouldUnregister,
	textFieldProps,
	...restProps
}: RHFSelectorProps<T>) {
	const {
		field,
		fieldState: { error },
	} = useController({ name, control, rules, defaultValue, shouldUnregister });

	return (
		<Autocomplete
			renderInput={params => <TextField {...textFieldProps} {...params} />}
			onChange={(event, newValue, reason) => {
				restProps.onChange?.(event, newValue, reason);
				field.onChange(newValue);
			}}
			renderOption={(props, option) => {
				return (
					<li {...props} key={option}>
						{option}
					</li>
				);
			}}
			renderTags={(tagValue, getTagProps) => {
				return tagValue.map((option, index) => (
					<Chip {...getTagProps({ index })} key={option} label={option} />
				));
			}}
			{...restProps}
		/>
	);
}
