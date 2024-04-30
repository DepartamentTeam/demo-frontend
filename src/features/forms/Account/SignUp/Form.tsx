import { useState } from "react";
import { Input } from "@/shared/ui/Input/Input";
import styles from "@/features/forms/form.module.css";
import { hideIcon, googleProvider, appleProvider } from "@/shared/icons";
import { Eye } from "@gravity-ui/icons";
import { Checkbox } from "@/shared/ui/Checkbox/Checkbox";
import { useTranslations } from "next-intl";

export function SignUpForm() {
	const t = useTranslations();
	const [isPasswordHidden, setIsPasswordHidden] = useState(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		var data = new FormData(document.querySelectorAll("form")[0]);

		console.log(data.get("password"));
	};

	function showPassword() {
		document.querySelectorAll(
			"input[type='password']",
		)[0].style.webkitTextSecurity = "none";
		setIsPasswordHidden(false);
	}

	function hidePassword() {
		document.querySelectorAll(
			"input[type='password']",
		)[0].style.webkitTextSecurity = "disc";
		setIsPasswordHidden(true);
	}

	function handleChangeCheckbox() {
		const submitButton = document.querySelectorAll("button[type=submit]")[0];
		if (document.getElementById("privacy")?.checked == true) {
			submitButton.classList.remove("btn--disabled");
		} else {
			submitButton.classList.add("btn--disabled");
		}
	}

	const handleChange = () => {
		const submitButton = document.querySelectorAll("button[type=submit]")[0];
		document.querySelectorAll("input").forEach((input) => {
			if (input.value != " ") {
				submitButton.classList.remove("btn--disabled");
			}
			if (input.value == "") {
				submitButton.classList.add("btn--disabled");
			}
		});
	};
	return (
		<div className={styles.form}>
			<h1 className={`subhead-2__black ${styles.form__title}`}>
			{t("SignUp.title")}
			</h1>
			<form
				method="post"
				onSubmit={handleSubmit}
				className={styles.form__container}
			>
				<Input
					onChange={handleChange}
					name="name"
					type="text"
					label={t("SignUp.form.nameLabel")}
					autoComplete="given-name"
					placeholder={t("SignUp.form.namePlaceholder")}
				/>
				<Input
					onChange={handleChange}
					name="email"
					type="email"
					label={t("SignUp.form.emailLabel")}
					autoComplete="email"
					placeholder={t("SignUp.form.emailPlaceholder")}
				/>

				<Input
					className="input__hide-password"
					onChange={handleChange}
					name="password"
					placeholder={t("SignUp.form.passwordPlaceholder")}
					type="password"
					autoComplete="current-password"
					label={t("SignUp.form.passwordLabel")}
					helperButton={
						<button
							type="button"
							onClick={showPassword}
							onMouseLeave={hidePassword}
							className="btn btn--icon"
						>
							{isPasswordHidden ? hideIcon : <Eye />}
						</button>
					}
				/>

				<div className={styles.auth__providers__container}>
					<p className="text__small-3">или войдите с помощью</p>
					<div className={styles.auth__providers}>
						<button className={`${styles.auth__provider} btn`} type="button">
							{googleProvider}
						</button>
						<button className={`${styles.auth__provider} btn`} type="button">
							{appleProvider}
						</button>
					</div>
				</div>
				<Checkbox
					onChange={handleChangeCheckbox}
					name="privacy"
					label={
						<>
							{t.rich("SignUp.form.checkbox", {
								a: (chunks) => <a href="/guidelines">{chunks}</a>
							})}
						</>
					}
				/>
				<button
					className="btn btn--lg btn--primary btn--disabled"
					type="submit"
					value="Submit"
				>
					{t("btns.reg")}
				</button>
			</form>
		</div>
	);
}
