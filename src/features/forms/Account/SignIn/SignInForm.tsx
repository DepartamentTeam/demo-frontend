import { useState } from "react";
import { Input } from "@/shared/ui/Input/Input";
import styles from "@/features/forms/form.module.css";
import { hideIcon, googleProvider, appleProvider, facebookProvider } from "@/shared/icons";
import { Eye } from "@gravity-ui/icons";
import { useTranslations } from "next-intl";
import { schema } from "./shema";
import Link from "next/link";
import type { FormEvent } from "react";

export function SignInForm() {
	const t = useTranslations("SignIn");
	const [isPasswordHidden, setIsPasswordHidden] = useState(false);
	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		var data = new FormData(document.querySelectorAll("form")[0]);

		schema
			.validate(data.values)
			.then(() => {
				console.log("Valid");
			})
			.catch((err) => {
				console.error("Error", err);
			});
	}

	function showPassword() {
		document
			.querySelectorAll("input[type='password']")[0]
			.classList.add("input__show-password");
		setIsPasswordHidden(false);
	}

	function hidePassword() {
		document
			.querySelectorAll("input[type='password']")[0]
			.classList.add("input__hide-password");
		setIsPasswordHidden(true);
	}

	const handleChange = () => {
		document.querySelectorAll("input").forEach((input) => {
			if (input.value != " ") {
				document
					.querySelectorAll("button[type=submit]")[0]
					.classList.remove("btn--disabled");
			}
			if (input.value == "") {
				document
					.querySelectorAll("button[type=submit]")[0]
					.classList.add("btn--disabled");
			}
		});
	};
	return (
		<div className={styles.form}>
			<h1 className={`subhead-2__black ${styles.form__title}`}>{t("title")}</h1>
			<form
				noValidate
				onSubmit={handleSubmit}
				className={styles.form__container}
			>
				<Input
					onChange={handleChange}
					name="email"
					type="email"
					label={t("emailLabel")}
					autoComplete="email"
					placeholder={t("emailPlaceholder")}
				/>

				<Input
					className="input__hide-password"
					onChange={handleChange}
					name="password"
					placeholder={t("passwordPlaceholder")}
					type="password"
					autoComplete="current-password"
					label={t("passwordLabel")}
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
				<div className={styles.form__links}>
					<Link className="btn btn--text" href="/account/sign-up">
						{t("registration")}
					</Link>
					<Link className="btn btn--text" href="/account/restore">
						{t("forgotPassword")}
					</Link>
				</div>
				<div className={styles.auth__providers__container}>
					<p className="text__small-3">{t("providersLabel")}</p>
					<div className={styles.auth__providers}>
						<button className={`${styles.auth__provider} btn`} type="button">
							{googleProvider}
						</button>
						<button className={`${styles.auth__provider} btn`} type="button">
							{appleProvider}
						</button>
						<button className={`${styles.auth__provider} btn`} type="button">
							{facebookProvider}
						</button>
					</div>
				</div>
				<button
					className="btn btn--lg btn--primary btn--disabled"
					type="submit"
					value="Submit"
				>
					{t("button")}
				</button>
			</form>
		</div>
	);
}
