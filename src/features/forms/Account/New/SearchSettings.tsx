import styles from "@/features/forms/form.module.css";
import { useState, useRef, useContext } from "react";
import type { ChangeEvent } from "react";
import { Input } from "@/shared/ui/Input/Input";
import { Select } from "@/shared/ui/Select/Select";
import { Switch } from "@/shared/ui/Switch/Switch";
import { useTranslations } from "next-intl";
import { NewAccountContext, useAccountStore } from "./context";
import { schema } from "./schema";
import type { Error } from "@/shared/types";

type Error = {
	state: boolean;
	message: string;
};

export function SearchSettings() {
	const t = useTranslations("AccountNew.SearchSettings");
	const [error, setError] = useState<Error>();

	console.error(error);
	const account = useAccountStore((state) => state.account);

	const setCountry = useAccountStore((state) => state.setCountry);

	const setCity = useAccountStore((state) => state.setCity);

	const setSalary = useAccountStore((state) => state.setSalary);

	const setAllowAnotherCity = useAccountStore(
		(state) => state.setAllowAnotherCity,
	);

	const setAllowAnotherCountries = useAccountStore(
		(state) => state.setAllowAnotherCountries,
	);

	const handleSalaryChange = (e: ChangeEvent<HTMLInputElement>) => {
		var { value } = e.target;


		if (!error) {
			setSalary(value);
		}
	};

	return (
		<>
			<div className={styles.title}>
				<h1 className="subhead-2__black">{t("title")}</h1>
				<p>{t("subtitle")}</p>
			</div>

			<Select
				label={t("selectCountry.label")}
				name="country"
				id=""
				value={account.city}
				setter={setCountry}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setCountry(e.target.value)
				}
				placeholder={t("selectCountry.placeholder")}
				options={[
					{
						label: "Россия",
						value: "Russia",
					},
				]}
			/>

			<Switch
				checked={account.allowAnotherCountries}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setAllowAnotherCountries(e.currentTarget.checked)
				}
				name="allowAnotherCountries"
				label={t("selectCountry.toggler")}
			/>

			<Select
				onChange={(e) => setCity(e.currentTarget.value)}
				value={account.city}
				setter={setCity}
				label={t("selectCity.label")}
				name="city"
				id=""
				placeholder={t("selectCity.placeholder")}
				options={[
					{
						label: "Москва",
						value: "Moscow",
					},
				]}
			/>

			<Switch
				checked={account.allowAnotherCity}
				name="allowAnotherCities"
				onChange={(e) => setAllowAnotherCity(e.target.checked)}
				label={t("selectCity.toggler")}
			/>
			<Input
				onChange={handleSalaryChange}
				min={10}
				value={account.salary}
				max={999}
				label={t("salary.label")}
				placeholder=""
				helperButton={<span>USD</span>}
				autoComplete="off"
				name="salary"
				type="number"
				error={error}
			/>
		</>
	);
}
