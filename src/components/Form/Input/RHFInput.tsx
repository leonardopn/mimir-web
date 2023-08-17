import {
  FieldValue,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { Input, InputProps } from ".";

type RHFInputProps<T extends FieldValues> = InputProps & UseControllerProps<T>;

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

  return <Input {...restProps} {...field}></Input>;
}
