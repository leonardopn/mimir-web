import { Select, SelectProps } from "@chakra-ui/react";
import { FieldValues, Path, PathValue, UseControllerProps, useController } from "react-hook-form";

type RHFSelectorProps<T extends FieldValues> = SelectProps &
	UseControllerProps<T> & { options: T[] };

export function RHFSelector<T extends FieldValues>({
	name,
	control,
	rules,
	defaultValue,
	shouldUnregister,
	options,
	...restProps
}: RHFSelectorProps<T>) {
	const {
		field,
		fieldState: { error },
	} = useController({ name, control, rules, defaultValue, shouldUnregister });

	return (
		<Select onChange={field.onChange} onBlur={field.onBlur} value={field.value} {...restProps}>
			{options.map((options, index) => {
				return (
					<option value="option3" key={index}>
						Option 3
					</option>
				);
			})}
		</Select>
	);
}
