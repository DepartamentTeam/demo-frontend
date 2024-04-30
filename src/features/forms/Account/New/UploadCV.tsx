import styles from "@/features/forms/form.module.css";
import { useState, useRef, useContext } from "react";
import { thrashBin } from "@/shared/icons";
import { Chip } from "@/shared/ui/Chip/Chip";
import type { ChangeEvent, DragEvent } from "react";
import { Input } from "@/shared/ui/Input/Input";
import { useTranslations } from "next-intl";
import { useAccountStore } from "./context";

type Error = {
	state: boolean;
	message: string;
};

export function UploadCV() {
	const setPosition = useAccountStore((state) => state.setPosition);

	const setFile = useAccountStore((state) => state.setFile);

	const { account } = useAccountStore((state) => state);
	const t = useTranslations("AccountNew.UploadCV");

	const [error, setError] = useState<Error>({ state: false, message: "" });

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFile(event.target.files![0]);
	};

	const handleDragOver = (event: DragEvent) => {
		event.preventDefault();
		document
			.getElementById("dropdownzone")
			?.classList.add(`${styles.__dropdown_zone__focus}`);
	};

	const handleDragOut = (event: DragEvent) => {
		event.preventDefault();
		document
			.getElementById("dropdownzone")
			?.classList.remove(`${styles.__dropdown_zone__focus}`);
	};

	const handleDrop = (event: DragEvent) => {
		event.preventDefault();
		const file = event.dataTransfer.files![0];

		if (file.size > 5242880) {
			setError({ state: true, message: "Файл большого размера" });
		} else {
			setFile(file);
		}
	};

	function handleClick() {
		fileInputRef.current?.click();
	}

	function handleReset() {
		setFile(null);
	}

	return (
		<>
			<div className={styles.form__title}>
				<h1 className="subhead-2__black">{t("title")}</h1>
				<p>{t("subtitle")}</p>
			</div>

			{/* <Input
				required
				value={account?.position}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setPosition(e.target.value)
				}
				name="position"
				type="text"
				label={t("label")}
				autoComplete="off"
				placeholder={t("placeholder")}
			/> */}

			<div
				id="dropdownzone"
				className={styles.__dropdown_zone}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				onDragLeave={handleDragOut}
			>
				<div
					className={`${styles.__dropdown_zone__container} 
						${error.state && styles.error} 
						${account?.file && styles.success}
						`}
				>
					{!account?.file && (
						<>
							<h2 className="h4 blue">{t("dropdown.title")}</h2>

							<p>{t("dropdown.subtitle1")}</p>
							<span className={styles.__dropdown_zone__chips}>
								<Chip label=".pdf" theme="primary" variant="outlined" />
								{/* <Chip label=".docx" theme="primary" variant="outlined" /> */}
							</span>
							<p>{t("dropdown.subtitle2")}</p>
							<input
								value={account?.file}
								name="cv"
								type="file"
								accept=".pdf"
								className={styles.__input__file}
								onChange={handleFileChange}
								ref={fileInputRef}
							/>
							<button
								type="button"
								onClick={handleClick}
								className="btn btn--outlined"
							>
								{t("dropdown.btn")}
							</button>
						</>
					)}
					{account?.file && (
						<>
							<h2 className="h4 blue">{t("success.title")}</h2>

							<>
								
								<span className={`btn--icon btn btn--secondary`}>
									<span className={styles.fileLabel}>{account.file.name}</span>
									<button
										className="btn btn--icon btn--error"
										onClick={handleReset}
									>
										{thrashBin}
									</button>
								</span>

								<input
									style={{ opacity: 0, height: 0, width: 0 }}
									value={account?.file}
									name="file"
									type="hidden"
									
								/>
							</>
						</>
					)}
					{error.message && (
						<>
							<h2 className="h4 error">{t("error.title")}</h2>
							<p>{error.message}</p>
						</>
					)}
				</div>
			</div>
		</>
	);
}
