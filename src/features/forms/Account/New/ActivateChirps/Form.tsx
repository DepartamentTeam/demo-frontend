import styles from "@/features/forms/form.module.css";
import { Select } from "@/shared/ui/Select/Select";
import { Card } from "@/shared/ui/Card/Card";
import { useTranslations, useFormatter } from "next-intl";
import { useContext, useState } from "react";
import { useAccountStore } from "../context";
import { RadioGroup } from "@/shared/ui/RadioGroup/RadioGroup";
import { Chip } from "@/shared/ui/Chip/Chip";
import type { ChangeEvent } from "react";

export function ActivateChirps() {
	const account = useAccountStore((state) => state.account);
	
	const currency = document.getElementsByTagName("html")[0].getAttribute("lang") == "en" ? "USD" : "RUB";

	const setChirpsPlan = useAccountStore((state) => state.setChirpsPlan);
	const format = useFormatter();
	const t = useTranslations("AccountNew.ActivateChirps");

	const handleFieldsetChange = (e: ChangeEvent<HTMLInputElement>) => {
		setChirpsPlan({ position: "", plan: e.target.value });
	};

	const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
		setChirpsPlan({ position: e.target.value, plan: "" });
	};

	return (
		<>
			<div className={styles.title}>
				<h1 className="subhead-2__black">{t("title")}</h1>
				<p>{t("subtitle")}</p>
			</div>
			<div>
				{" "}
				<Select
					onChange={handleSelectChange}
					setter={setChirpsPlan}
					label=""
					name="country"
					id=""
					placeholder={t("seletPlaceholder")}
					options={[{ label: account.position, value: account.position }]}
				/>
			</div>

			<RadioGroup
				onChange={handleFieldsetChange}
				name="chirpsPlan"
				className="account__cards__flexbox"
				currentValue={account.chirps.plan}
				inputs={[
					{
						name: "chirpsPlan",
						value: "20",
						element: (
							<Card
								chip={
									<Chip
										label={format.number(Number(t("cards.first.price")), {
											style: "currency",
											currency: currency,
										})}
										theme="primary"
										variant="filled"
									/>
								}
								title={t("cards.first.title")}
								variant="background"
								color="purple"
							/>
						),
					},
					{
						name: "chirpsPlan",
						value: "50",
						element: (
							<Card
								chip={
									<Chip
										label={format.number(Number(t("cards.second.price")), {
											style: "currency",
											currency: currency,
										})}
										theme="primary"
										variant="filled"
									/>
								}
								title={t("cards.second.title")}
								variant="background"
								color="blue"
							/>
						),
					},
					{
						name: "chirpsPlan",
						value: "100",
						element: (
							<Card
								chip={
									<Chip
										label={format.number(Number(t("cards.third.price")), {
											style: "currency",
											currency: currency,
										})}
										theme="primary"
										variant="filled"
									/>
								}
								title={t("cards.third.title")}
								variant="background"
								color="orange"
							/>
						),
					},
					{
						name: "chirpsPlan",
						value: "200",
						element: (
							<Card
								chip={
									<Chip
										label={format.number(Number(t("cards.fourth.price")), {
											style: "currency",
											currency: currency,
										})}
										theme="primary"
										variant="filled"
									/>
								}
								title={t("cards.fourth.title")}
								variant="background"
								color="green"
							/>
						),
					},
				]}
			/>

			<span>
				{t.rich("footer", {
					discount: (chunks) => <a href="/discount">{chunks}</a>,
				})}{" "}
			</span>
		</>
	);
}
