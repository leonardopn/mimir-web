import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputProps,
	ScaleFade,
	Tag,
	TagLabel,
	TagRightIcon,
	useDisclosure,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { FocusEvent, KeyboardEvent, useState } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { tv } from "tailwind-variants";
import { z } from "zod";

type RHFAutoCompleteProps<T extends FieldValues> = InputProps &
	UseControllerProps<T> & { options: string[]; label?: string };

function mapDefaultOption(defaultOption: string[]) {
	return defaultOption.map(op => ({ value: op, isSelected: false }));
}

const OptionStyle = tv({
	variants: {
		isSelected: {
			true: "",
			false: "",
		},
	},
	base: "cursor-pointer hover:bg-gray-50 active:bg-gray-100 py-2 px-3 transition-colors",
});

const OptionsStyle = tv({
	variants: {
		isOpen: {
			true: "z-10",
			false: "-z-10",
		},
	},
	base: "border border-solid rounded-md bg-white mt-2 w-full overflow-hidden absolute",
});

export function RHFAutoComplete<T extends FieldValues>({
	control,
	name,
	rules,
	defaultValue,
	shouldUnregister,
	label,
	options,
	isRequired,
	...restProps
}: RHFAutoCompleteProps<T>) {
	const {
		field,
		fieldState: { error },
	} = useController({ name, control, rules, defaultValue, shouldUnregister });

	const [inputState, setInputState] = useState("");
	const [optionsState, setOptionsState] = useState(mapDefaultOption(options));
	const { onOpen, onClose, isOpen } = useDisclosure();

	const value = z.array(z.string()).parse(field.value);

	function handleAddOption(e: KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter" && inputState.trim()) {
			if (!value.find(op => op === inputState)) {
				field.onChange([...value, inputState]);
				setInputState("");
				setOptionsState(oldState => [...oldState, { value: inputState, isSelected: true }]);
				onClose();
			}
		}
	}

	function handleRemoveOption(option: string) {
		field.onChange(value.filter(op => op !== option));
		setOptionsState(oldState => oldState.filter(op => op.value !== option));
	}

	function handleInputFocus(e: FocusEvent<HTMLInputElement, Element>) {
		onOpen();
	}

	function handleInputBlur(e: FocusEvent<HTMLInputElement, Element>) {
		onClose();
	}

	function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			e.preventDefault();
		}
	}

	return (
		<FormControl isRequired={isRequired}>
			{!!label && <FormLabel>{label}</FormLabel>}
			<div className="relative">
				<Input
					{...restProps}
					value={inputState}
					autoComplete="off"
					onChange={e => setInputState(e.target.value)}
					onKeyUp={handleAddOption}
					onFocus={handleInputFocus}
					onBlur={handleInputBlur}
					onKeyDown={handleKeyDown}
				/>

				<ScaleFade in={isOpen}>
					<div className={OptionsStyle({ isOpen })}>
						{optionsState.map(option => {
							return (
								<div
									key={option.value}
									className={OptionStyle({ isSelected: option.isSelected })}>
									{option.value}
								</div>
							);
						})}
					</div>
				</ScaleFade>
			</div>

			{!!error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
			<div className="flex gap-2 flex-wrap mt-2">
				{value.map(item => {
					return (
						<Tag
							key={item}
							variant="subtle"
							onClick={() => handleRemoveOption(item)}
							className="cursor-pointer">
							<TagLabel>{item}</TagLabel>
							<TagRightIcon boxSize="12px" as={Icon} icon="mdi:close" />
						</Tag>
					);
				})}
			</div>
		</FormControl>
	);
}
