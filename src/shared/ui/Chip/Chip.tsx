import styles from "./chip.module.css";

type TChip = {
	label: string;
	theme: "primary" | "accent" | "error";
	variant: "outlined" | "filled"
};

export function Chip({ label, theme, variant}: TChip) {
	return (
		<div className={`${styles.__container} ${styles[theme]} ${styles[variant]}`}>
			{label}
		</div>
	);
}
