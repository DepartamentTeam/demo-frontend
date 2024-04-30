import type { ChangeEvent, ReactNode } from "react";

import styles from "./input.module.css";
import { Error } from "@/shared/types";

type Props = {
	type: "email" | "password" | "text" | "number";
	label: string;
	placeholder: string;
	autoComplete:
		| "given-name"
		| "lastName"
		| "off"
		| "on"
		| "new-password"
		| "current-password"
		| "email";
	helperButton?: ReactNode;
	handler?: () => void;
	name: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	min?: number;
	max?: number;
	value?: string | number | undefined;
	required?: boolean;
	onError?: () => {};
	error?: Error;
};
/**
 * Input component.
 * @constructor
 * @param {string} type - The title of the input.
 * @param {string} label - The label of the input.
 * @param {string} placeholder - The placeholder of the input.
 * @param {string} autoComplete - The type of the input auto complete. See the MDN reference https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
 */
export function Input({
	required,
	className,
	name,
	type,
	label,
	placeholder,
	autoComplete,
	helperButton,
	onChange,
	min,
	max,
	value,
	onError,
	error,
}: Props) {
	return (
		<div className={`${styles.container} ${error?.state && styles.error}`}>
			<label className="text__small-3 text__bold">
				{label}
				{required && "*"}
				<input
					required={required}
					value={value}
					min={min}
					max={max}
					onChange={onChange}
					name={name}
					autoComplete={autoComplete}
					placeholder={placeholder}
					className={`${styles.input} ${className}`}
					type={type}
				/>
				{helperButton && <div className={styles.helper}>{helperButton}</div>}
			</label>
			{error?.state && <span>{error.message}</span>}
		</div>
	);
}
