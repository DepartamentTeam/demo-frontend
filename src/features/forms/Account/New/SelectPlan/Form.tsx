import { Segments } from "@/shared/ui/Segments/Segments";
import styles from "@/features/forms/form.module.css";
import { Card } from "@/shared/ui/Card/Card";
import { useTranslations, useFormatter } from "next-intl";
import Banner from "@/shared/ui/Banner/Banner";
import { BrushAsset } from "@/shared/assets";
import { CrownDiamond } from "@gravity-ui/icons";
import { RadioGroup } from "@/shared/ui/RadioGroup/RadioGroup";
import { useContext } from "react";
import { useAccountStore } from "../context";
import { Chip } from "@/shared/ui/Chip/Chip";
import type { ChangeEvent } from "react";

export function SelectPlan() {
	const t = useTranslations("Sub");
	const format = useFormatter();
	const currency =
		document.getElementsByTagName("html")[0].getAttribute("lang") == "en"
			? "USD"
			: "RUB";

	const account = useAccountStore((state) => state.account);
	const setPlan = useAccountStore((state) => state.setPlan);
	const handleChange = (e: ChangeEvent<HTMLFieldSetElement>) => {
		setPlan({ duration: e.target.value, plan: e.target.name });
	};
	return (
		<>
			<div className={styles.title}>
				<h1 className="subhead-2__black">{t("title")}</h1>
				<p>{t("subtitle")} </p>
			</div>
			<>
				<Segments
					className={styles.controls}
					tabs={[
						{
							id: 0,
							title: t("plan.free.title"),
							body: (
								<>
									{" "}
									<div className="account__cards__flexbox">
										<Card
											variant="default"
											title={<span>{t("plan.free.title")}</span>}
											color="light_blue"
										/>
										<Banner
											title={t("plan.free.banner.title")}
											backgroundColor="blue-100"
											topSubtitle={
												<>
													<CrownDiamond />
													Полный доступ с Премиум
												</>
											}
											subtitle="новых вакансий собираем ежедневно"
											backgroundImage="/assets/img/banner-premium.png"
										/>
									</div>
								</>
							),
						},
						{
							id: 1,
							title: t("plan.basic.title"),
							body: (
								<>
									<RadioGroup
										currentValue={account.subscribe.duration}
										onChange={handleChange}
										className="account__cards__flexbox"
										name="basic"
										inputs={[
											{
												name: "basic",
												value: "1",
												element: (
													<Card
														variant="default"
														title={
															<span>
																{t("plan.basic.title")} <br />{" "}
																{t("plan.basic.cards.first.title")}
															</span>
														}
														chip={
															<Chip
																theme="primary"
																variant="filled"
																label={format.number(
																	Number(t("plan.basic.cards.first.price")),
																	{ style: "currency", currency: currency },
																)}
															/>
														}
														color="purple"
													/>
												),
											},
											{
												name: "basic",
												value: "3",
												element: (
													<Card
														title={
															<span>
																{t("plan.basic.title")} <br />{" "}
																{t("plan.basic.cards.second.title")}
															</span>
														}
														chip={
															<Chip
																theme="primary"
																variant="filled"
																label={format.number(
																	Number(t("plan.basic.cards.second.price")),
																	{ style: "currency", currency: currency },
																)}
															/>
														}
														variant="default"
														color="blue"
													/>
												),
											},
											{
												name: "basic",
												value: "6",
												element: (
													<Card
														title={
															<span>
																{t("plan.basic.title")} <br />{" "}
																{t("plan.basic.cards.third.title")}
															</span>
														}
														chip={
															<Chip
																theme="primary"
																variant="filled"
																label={format.number(
																	Number(t("plan.basic.cards.third.price")),
																	{ style: "currency", currency: currency },
																)}
															/>
														}
														variant="default"
														color="orange"
													/>
												),
											},
											{
												value: "13",
												name: "basic",
												element: (
													<Card
														title={
															<span>
																{t("plan.basic.title")} <br />{" "}
																{t("plan.basic.cards.fourth.title")}
															</span>
														}
														body={
															<>
																<span>10 positions</span>
																<span>0 chirps</span>
																<span>Only job boards</span>
															</>
														}
														chip={
															<Chip
																theme="primary"
																variant="filled"
																label={format.number(
																	Number(t("plan.basic.cards.fourth.price")),
																	{ style: "currency", currency: currency },
																)}
															/>
														}
														variant="default"
														color="green"
													/>
												),
											},
										]}
									/>
								</>
							),
						},
						{
							id: 2,
							title: t("plan.premium.title"),
							body: (
								<>
									<RadioGroup
										currentValue={account.subscribe.duration}
										className="account__cards__flexbox"
										name="Premium"
										onChange={handleChange}
										inputs={[
											{
												name: "Premium",
												value: "1",
												element: (
													<Card
														variant="background"
														title={
															<span>
																{t("plan.premium.title")} <br />{" "}
																{t("plan.premium.cards.first.title")}
															</span>
														}
														body={
															<>
																<div className="icon">
																	<svg
																		width="29"
																		height="28"
																		viewBox="0 0 29 28"
																		fill="none"
																		xmlns="http://www.w3.org/2000/svg"
																	>
																		<path
																			fill-rule="evenodd"
																			clip-rule="evenodd"
																			d="M25.5635 14C25.5635 20.0751 20.6386 25 14.5635 25C8.48834 25 3.56348 20.0751 3.56348 14C3.56348 7.92487 8.48834 3 14.5635 3C20.6386 3 25.5635 7.92487 25.5635 14ZM28.5635 14C28.5635 21.732 22.2955 28 14.5635 28C6.83149 28 0.563477 21.732 0.563477 14C0.563477 6.26801 6.83149 0 14.5635 0C22.2955 0 28.5635 6.26801 28.5635 14ZM16.3851 18.6051L10.5854 20.2161C9.95395 20.3915 9.27692 20.2134 8.81348 19.75C8.35004 19.2866 8.17194 18.6095 8.34736 17.978L9.95837 12.1784C10.3339 10.8266 11.3901 9.77038 12.7419 9.39489L18.5415 7.78388C19.173 7.60846 19.85 7.78656 20.3135 8.25C20.7769 8.71344 20.955 9.39047 20.7796 10.022L19.1686 15.8216C18.7931 17.1734 17.7369 18.2296 16.3851 18.6051ZM16.5635 13.9996C16.5635 15.1041 15.6681 15.9996 14.5635 15.9996C13.4589 15.9996 12.5635 15.1041 12.5635 13.9996C12.5635 12.895 13.4589 11.9996 14.5635 11.9996C15.6681 11.9996 16.5635 12.895 16.5635 13.9996Z"
																			fill="#A49BFE"
																		/>
																	</svg>
																</div>
																<div
																	dangerouslySetInnerHTML={{
																		__html: t.raw(
																			"plan.premium.cards.first.body",
																		),
																	}}
																></div>
															</>
														}
														color="purple"
														chip={
															<Chip
																theme="primary"
																variant="filled"
																label={format.number(
																	Number(t("plan.premium.cards.first.price")),
																	{ style: "currency", currency: currency },
																)}
															/>
														}
													/>
												),
											},
											{
												name: "Premium",
												value: "3",
												element: (
													<Card
														title={
															<span>
																{t("plan.premium.title")} <br />{" "}
																{t("plan.premium.cards.second.title")}
															</span>
														}
														body={
															<>
																<div className="icon">
																	<svg
																		width="29"
																		height="26"
																		viewBox="0 0 29 26"
																		fill="none"
																		xmlns="http://www.w3.org/2000/svg"
																	>
																		<path
																			fill-rule="evenodd"
																			clip-rule="evenodd"
																			d="M16.5635 3H12.5635C12.0112 3 11.5635 3.44772 11.5635 4V6H17.5635V4C17.5635 3.44772 17.1158 3 16.5635 3ZM8.56348 4V6H6.56348C3.24977 6 0.563477 8.68629 0.563477 12V20C0.563477 23.3137 3.24977 26 6.56348 26H22.5635C25.8772 26 28.5635 23.3137 28.5635 20V12C28.5635 8.68629 25.8772 6 22.5635 6H20.5635V4C20.5635 1.79086 18.7726 0 16.5635 0H12.5635C10.3543 0 8.56348 1.79086 8.56348 4ZM17.5635 9H20.5635H22.5635C24.2203 9 25.5635 10.3431 25.5635 12V20C25.5635 21.6569 24.2203 23 22.5635 23H6.56348C4.90662 23 3.56348 21.6569 3.56348 20V12C3.56348 10.3431 4.90662 9 6.56348 9H8.56348H11.5635H17.5635ZM8.06348 12C7.23505 12 6.56348 12.6716 6.56348 13.5C6.56348 14.3284 7.23505 15 8.06348 15H21.0635C21.8919 15 22.5635 14.3284 22.5635 13.5C22.5635 12.6716 21.8919 12 21.0635 12H8.06348Z"
																			fill="#8FC4FF"
																		/>
																	</svg>
																</div>
																<div
																	dangerouslySetInnerHTML={{
																		__html: t.raw(
																			"plan.premium.cards.second.body",
																		),
																	}}
																></div>
															</>
														}
														variant="background"
														color="blue"
														chip={
															<Chip
																theme="primary"
																variant="filled"
																label={format.number(
																	Number(t("plan.premium.cards.second.price")),
																	{ style: "currency", currency: currency },
																)}
															/>
														}
													/>
												),
											},
											{
												name: "Premium",
												value: "6",
												element: (
													<Card
														variant="background"
														title={
															<span>
																{t("plan.premium.title")} <br />{" "}
																{t("plan.premium.cards.third.title")}
															</span>
														}
														color="orange"
														body={
															<>
																<div className="icon">
																<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.7638 9.7882L19.9405 11.595L21.2819 13.0589L23.993 16.0177L20.0057 15.5636L18.0329 15.3389L17.0551 17.0669L15.0789 20.5597L14.2786 16.6272L13.8827 14.6816L11.9371 14.2857L8.0046 13.4854L11.4974 11.5092L13.2254 10.5314L13.0007 8.55865L12.5466 4.57133L15.5054 7.28244L16.9693 8.62377L18.7761 7.80046L22.4279 6.13639L20.7638 9.7882ZM12.6015 0.552745L17.5321 5.07053L23.6175 2.29752C25.3008 1.53045 27.0338 3.26346 26.2668 4.94679L23.4938 11.0322L28.0116 15.9628C29.2613 17.3267 28.1486 19.5105 26.3106 19.3011L19.6661 18.5443L16.3729 24.3646C15.4619 25.9746 13.0413 25.5912 12.6724 23.7785L11.3389 17.2254L4.78577 15.8919C2.97305 15.523 2.58966 13.1024 4.19966 12.1914L10.02 8.89815L9.26318 2.25368C9.05384 0.415703 11.2376 -0.696957 12.6015 0.552745ZM9.62414 21.0611C10.2099 20.4753 10.2099 19.5256 9.62414 18.9398C9.03835 18.354 8.0886 18.354 7.50282 18.9398L0.502816 25.9398C-0.0829701 26.5256 -0.0829701 27.4753 0.502816 28.0611C1.0886 28.6469 2.03835 28.6469 2.62414 28.0611L9.62414 21.0611Z" fill="#FFCC80"/>
</svg>

																</div>
																<div
																	dangerouslySetInnerHTML={{
																		__html: t.raw(
																			"plan.premium.cards.third.body",
																		),
																	}}
																></div>
															</>
														}
														
														chip={
															<Chip
																theme="primary"
																variant="filled"
																

																label={format.number(
																	Number(t("plan.premium.cards.third.price")),
																	{ style: "currency", currency: currency },
																)}
															/>
														}
													/>
												),
											},
											{
												value: "13",
												name: "Premium",
												element: (
													<Card
														variant="background"
														title={
															<span>
																{t("plan.premium.title")} <br />{" "}
																{t("plan.premium.cards.fourth.title")}
															</span>
														}
														color="green"
														body={
															<>
																<div className="icon">
																<svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M30.3017 1.53664C30.2125 0.905806 29.7245 0.377903 29.0627 0.267601C23.3004 -0.692783 17.4879 1.67017 14.0302 6.37874L13.7197 6.80156L8.53774 7.02686C8.22305 7.04055 7.92065 7.15294 7.67343 7.34812L0.955914 12.6514C0.529843 12.9878 0.318758 13.5281 0.403983 14.0642C0.489209 14.6004 0.857445 15.0486 1.36682 15.2363L8.06479 17.7039C9.41033 18.2503 10.3265 18.8257 11.0321 19.5313C11.7378 20.237 12.3132 21.1533 12.8596 22.4991L15.3271 29.1965C15.5148 29.7059 15.963 30.0742 16.4991 30.1594C17.0352 30.2446 17.5756 30.0335 17.9119 29.6074L23.2152 22.8899C23.4104 22.6427 23.5228 22.3403 23.5365 22.0256L23.7618 16.8436L24.1846 16.5332C28.8833 13.0826 31.2462 7.28712 30.3017 1.53664ZM9.15209 10.003L11.4418 9.90343L8.06209 14.5058L4.91646 13.3469L9.15209 10.003ZM17.2165 25.6469L16.0575 22.5012L20.6599 19.1215L20.5604 21.4113L17.2165 25.6469ZM27.4702 3.09316C23.1956 2.76476 19.0164 4.65722 16.4482 8.15442L10.8881 15.726C11.7396 16.1993 12.4896 16.7462 13.1534 17.41C13.8172 18.0738 14.364 18.8237 14.8373 19.6753L22.4089 14.1151C25.9061 11.547 27.7986 7.36777 27.4702 3.09316ZM4.31838 26.904C4.06236 26.9494 3.80913 26.9837 3.56468 27.0093C3.5892 26.7723 3.62212 26.527 3.66574 26.2788C3.87305 25.0994 4.25325 24.2499 4.71822 23.7849C5.20789 23.2953 6.10706 23.2358 6.72776 23.8565C7.34846 24.4772 7.28895 25.3764 6.79929 25.866C6.35293 26.3124 5.51119 26.6926 4.31838 26.904ZM0.523731 29.1373C0.49666 28.6691 0.472863 27.798 0.572955 26.7771C0.737098 25.103 1.23443 23.0261 2.5969 21.6636C4.30364 19.9569 7.10283 19.9889 8.84908 21.7352C10.5953 23.4814 10.6274 26.2806 8.92061 27.9873C6.7578 30.1501 2.69667 30.1227 1.45129 30.0584C1.20924 30.0459 0.985076 29.9389 0.813692 29.7675C0.644157 29.598 0.537573 29.3766 0.523731 29.1373Z" fill="#28E1AA"/>
</svg>

																</div>
																<div
																	dangerouslySetInnerHTML={{
																		__html: t.raw(
																			"plan.premium.cards.fourth.body",
																		),
																	}}
																></div>
															</>
														}
														chip={
															<Chip
																theme="primary"
																variant="filled"
																label={format.number(
																	Number(t("plan.premium.cards.fourth.price")),
																	{ style: "currency", currency: currency },
																)}
															/>
														}
													/>
												),
											},
										]}
									/>
								</>
							),
						},
					]}
				/>
			</>
			<span>
				{t.rich("footer", {
					link: (chunks) => <a href="/TO_DO_LINK">{chunks}</a>,
				})}
			</span>
		</>
	);
}
