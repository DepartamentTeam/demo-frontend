import styles from "@/features/forms/form.module.css";
import { UploadCV } from "./UploadCV";
import { useEffect, useState, useContext } from "react";
import { SearchSettings } from "./SearchSettings";
import { ArrowLeft } from "@gravity-ui/icons";
import { ActivateChirps } from "./ActivateChirps";
import { useTranslations } from "next-intl";
import { SelectPlan } from "./SelectPlan/Form";
import { NewAccountProvider, useAccountStore } from "./context";
import { CounterStoreProvider, useCounterStore } from "./context/counter";
import { schema } from "./schema";
import { useRouter } from "next/navigation";
import { useJobsStore } from "@/entities/Job/context";

const Stages = [
	<UploadCV key={1} />,
	// <SearchSettings key={2} />,
	// <ActivateChirps key={3} />,
	// <SelectPlan key={4} />,
];

export function Form() {
	const t = useTranslations();
	const [loading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const { account } = useAccountStore((state) => state);
	const router = useRouter();
	const { jobs_response, setResponse, setJobs } = useJobsStore((state) => state);
	const [activeStage, setActiveStage] = useState(0);

	function handleNextStage() {
		// var data = {};

		// document.querySelectorAll("input").forEach((value) => {
		// 	data[value.name] = value.value;
		// });
		// console.log(data);
		// schema.isValid(data).then((isValid) => {
		// 	if (isValid && activeStage < Stages.length) {
		// 		setActiveStage((prev) => prev + 1);
		// 	}
		// });

		
			handleUploadResume().then((data) => {
				
			
				if (data?.jobs) {
					setJobs(data.jobs);
					console.debug("data, jobs_response, jobs", data, jobs_response, jobs_response?.jobs);
					setIsLoading(false);
					router.push("/demo/offered", { scroll: true });
				} else {
					setIsLoading(false);
					setError(true);
				}
			});
		
	}

	async function handleUploadResume() {
		var data = new FormData(document.getElementById("new-account-form"));
		data.append("file", account.file);
		var Body = data;
		setIsLoading(true);
		try {
			var res = await fetch("http://cvbird.ai:8010/demo/upload", {
				method: "POST",
				body: Body,
			});

			return res.json();
		} catch (err) {
			console.error(err);
		}
	}

	function handlePrevStage() {
		if (activeStage <= Stages.length && activeStage > 0) {
			setActiveStage((prev) => prev - 1);
		}
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log(JSON.stringify(account));
	};

	useEffect(() => {
		// document.addEventListener("keydown", function (ev) {
		// 	if (ev.code == "Enter" || ev.code == "ArrowRight") {
		// 		handleNextStage();
		// 	}

		// 	if (ev.code == "ArrowLeft") {
		// 		handlePrevStage();
		// 	}

		// }, );

		// document.querySelectorAll("input").forEach((input) => {
		// 	if (input.required) {
		// 		document.getElementById("next-btn")?.classList.add("btn--disabled");
		// 	} else {
		// 		document.getElementById("next-btn")?.classList.remove("btn--disabled");
		// 	}
		// });
		// 	input.addEventListener("change", () => {
		// 	if (input.required && input.value != "") {
		// 		document.getElementById("next-btn")?.classList.remove("btn--disabled");
		// 	} else {
		// 		document.getElementById("next-btn")?.classList.add("btn--disabled");
		// 	}});
		// });

		if (activeStage == Stages.length - 1) {
			document.getElementById("next-btn")?.setAttribute("type", "submit");
		}
	}, [activeStage]);

	return (
		<CounterStoreProvider>
			<div
				className={`${styles.form} ${activeStage < 2 ? styles.sm : styles.lg}`}
			>
				<form
					id="new-account-form"
					noValidate
					onSubmit={handleSubmit}
					className={styles.form__container}
				>
					{/* <span>
						{activeStage} / {Stages.length}
					</span> */}
					{Stages[activeStage]}
	
					<div className={styles.btns}>
						{activeStage > 0 ? (
							<button
								className="btn btn--lg btn--text btn--icon"
								type="button"
								onClick={handlePrevStage}
							>
								<ArrowLeft /> {t("btns.back")}
							</button>
						) : (
							<span></span>
						)}

						{/* <button
							className="btn btn--lg btn--outlined"
							type="button"
							onClick={() => handleSubmit}
						>
							{t("btns.skip")}
						</button> */}
						
						{error ? 
						
						<span className="btn btn--lg btn--error">Service not available now</span> :
						loading ? (
							<span className="btn btn--lg btn--disabled">Loading</span>
						) : (
							<button
								id="next-btn"
								className="btn btn--lg btn--primary "
								type="button"
								onClick={handleNextStage}
							>
								{t("btns.continue")}
							</button>
						)}
					</div>
				</form>
			</div>
		</CounterStoreProvider>
	);
}
