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
import update from "immutability-helper";
import { ChangeEvent, KeyboardEvent, useMemo, useState } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { tv } from "tailwind-variants";
import { z } from "zod";

type RHFAutoCompleteProps<T extends FieldValues> = InputProps &
	UseControllerProps<T> & { options: string[]; label?: string };

interface IOption {
	value: string;
	isSelected: boolean;
}

function mapDefaultOption(defaultOption: string[]): IOption[] {
	return defaultOption.map(op => ({ value: op, isSelected: false }));
}

const OptionStyle = tv({
	variants: {
		isSelected: {
			true: "bg-slate-200 hover:bg-slate-300",
		},
	},
	base: "cursor-pointer hover:bg-slate-100 active:bg-slate-200 py-2 px-3 transition-colors",
});

const ScaleTransitionStyle = tv({
	variants: {
		isOpen: {
			true: "z-10",
			false: "-z-10",
		},
	},
	base: "w-full absolute",
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
	const [originalOptions, setOriginalOptions] = useState(mapDefaultOption(options));

	const { onOpen, onClose, isOpen } = useDisclosure();

	const value = z.array(z.string()).parse(field.value);

	function handleAddRemoveOptionByKeyUp(e: KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter" && inputState.trim()) {
			if (originalOptions.find(op => op.value === inputState && op.isSelected)) {
				handleRemoveOption(inputState);
			} else {
				handleAddOption(inputState);
			}
		}
	}

	function handleOnChangeInputText(e: ChangeEvent<HTMLInputElement>) {
		const inputText = e.target.value;
		setInputState(inputText);

		if (!inputText) {
			onClose();
		} else {
			!isOpen && onOpen();
		}
	}

	function handleAddOption(option: string) {
		setInputState("");
		onClose();

		if (!value.find(op => op === inputState)) {
			field.onChange([...value, option]);
		}

		setOriginalOptions(oldState => {
			const index = oldState.findIndex(op => op.value === option);
			if (index === -1) {
				return [...oldState, { value: option, isSelected: true }];
			} else {
				return update(oldState, { [index]: { isSelected: { $set: true } } });
			}
		});
	}

	function handleRemoveOption(option: string) {
		setInputState("");
		onClose();

		field.onChange(value.filter(op => op !== option));

		setOriginalOptions(oldState => {
			const index = oldState.findIndex(op => op.value === option);

			if (index === -1) {
				return oldState;
			} else {
				if (options.includes(option)) {
					return update(oldState, { [index]: { isSelected: { $set: false } } });
				}
				return update(oldState, { $splice: [[index, 1]] });
			}
		});
	}

	function handleAddRemoveOptionByClick(option: IOption) {
		if (option.isSelected) {
			handleRemoveOption(option.value);
		} else {
			handleAddOption(option.value);
		}
	}

	function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			e.preventDefault();
		}
	}

	const filteredOptions = useMemo(() => {
		return originalOptions.filter(op =>
			op.value.toLowerCase().includes(inputState.toLowerCase())
		);
	}, [inputState, originalOptions]);

	return (
		<FormControl isRequired={isRequired}>
			{!!label && <FormLabel>{label}</FormLabel>}
			<div className="relative">
				<Input
					{...restProps}
					value={inputState}
					autoComplete="off"
					onChange={handleOnChangeInputText}
					onKeyUp={handleAddRemoveOptionByKeyUp}
					onKeyDown={handleKeyDown}
				/>

				<ScaleFade in={isOpen} className={ScaleTransitionStyle({ isOpen })}>
					<div className="border border-solid rounded-md bg-white mt-2 w-full overflow-auto max-h-60">
						{!filteredOptions.length && <EmptyOption />}
						{filteredOptions.map(option => {
							return (
								<div
									key={option.value}
									onClick={() => handleAddRemoveOptionByClick(option)}
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

function EmptyOption() {
	return <p className="p-5 text-center">Sem opções</p>;
}
