import { useState, type FormEvent } from "react";
import { DynamicJobCard } from "./Card";
import { useJobsStore } from "../context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/shared/ui/Logo/Logo";
import { Input } from "@/shared/ui/Input/Input";
import style from "./flow.module.css";

export function Flow() {
	const { jobs_response, addJob, setJobs } = useJobsStore((state) => state);
	const [submitResponse, setSubmitResponse] = useState(undefined);
	if (!jobs_response?.jobs) {
		return (
			<>
				<h1>Resume not found</h1>
				<Link href="/" className="a">
					Upload the new one
				</Link>
			</>
		);
	}

	function Filtered(arr, id) {
		return arr.filter((_, idx) => idx != id);
	}

	const handleDrop = (id: number) => {
		console.debug("Drop", id);
		setJobs(Filtered(jobs_response?.jobs, id));
	};

	const handleAdd = (id: number) => {
		console.debug("Add", id);
		addJob(jobs_response?.jobs[id]);
		setJobs(Filtered(jobs_response?.jobs, id));
	};

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		var data = new FormData(e.currentTarget);
		var obj = {
			email: data.get("email"),
		};

		try {
			var res = await fetch("https://cvbird.ai/promo/email", {
				method: "POST",
				mode: "cors",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(obj),
			});
			res.json().then(data => data.email && setSubmitResponse(data.email));
		} catch (err) {
			console.error("Error while subitm with email", err);
		}
	}

	return (
		<div className="demo-container">
			{jobs_response?.jobs?.length > 0 ? (
				<>
					{jobs_response?.jobs?.map((job, idx) => (
						<DynamicJobCard
							handleAdd={handleAdd}
							handleDrop={handleDrop}
							key={idx}
							id={idx}
							{...job}
						/>
					))}
					<div className={style.actions}>
						<button
							className={`btn btn--icon btn--error ${style.btn}`}
							onClick={() => handleDrop(jobs_response?.jobs?.length - 1)}
						>
							<svg
								width="20"
								height="16"
								viewBox="0 0 20 16"
								fill="inherit"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M3.78792 0.462087C3.4218 0.0959708 2.82821 0.0959709 2.4621 0.462087C2.09598 0.828204 2.09598 1.4218 2.4621 1.78791L3.49905 2.82486C2.273 3.82907 1.28239 5.11487 0.624384 6.59538L0.299643 7.32605C0.108859 7.75531 0.108859 8.24531 0.299643 8.67457L0.624569 9.40565C1.81722 12.0891 4.10258 14.1329 6.90208 15.0196C8.91799 15.6581 11.082 15.6581 13.0979 15.0196C13.7331 14.8184 14.3419 14.5576 14.9175 14.2433L16.2121 15.5379C16.5782 15.904 17.1718 15.904 17.5379 15.5379C17.904 15.1718 17.904 14.5782 17.5379 14.2121L3.78792 0.462087ZM13.5221 12.8479L11.9051 11.2309C11.3468 11.5608 10.6955 11.7502 9.99997 11.7502C7.9289 11.7502 6.24997 10.0713 6.24997 8.00019C6.24997 7.30468 6.43931 6.6534 6.76926 6.09508L4.83289 4.15871C3.76356 4.99548 2.90138 6.08879 2.33778 7.35689L2.05182 8.00031L2.33797 8.64414C3.31266 10.8372 5.18036 12.5075 7.46824 13.2321C9.11573 13.7539 10.8842 13.7539 12.5317 13.2321C12.8716 13.1245 13.2023 12.9959 13.5221 12.8479ZM8.18853 7.51434C8.14707 7.6693 8.12497 7.83216 8.12497 8.00019C8.12497 9.03572 8.96444 9.87519 9.99997 9.87519C10.168 9.87519 10.3309 9.85308 10.4858 9.81163L8.18853 7.51434ZM10.2618 4.25918L13.741 7.73837C13.6125 5.87595 12.1242 4.38763 10.2618 4.25918ZM17.662 8.64414C17.3609 9.3216 16.9746 9.94917 16.517 10.5144L17.8488 11.8462C18.4638 11.1157 18.9797 10.2959 19.3754 9.40565L19.7003 8.67457C19.8911 8.24531 19.8911 7.75531 19.7003 7.32605L19.3756 6.59538C18.1828 3.91166 15.8972 1.86775 13.0973 0.981142C11.1023 0.34939 8.96236 0.342939 6.96439 0.961789L8.51295 2.51034C9.84821 2.26973 11.2276 2.35583 12.5313 2.76866C14.8194 3.49324 16.6874 5.16363 17.6622 7.35689L17.9481 8.00031L17.662 8.64414Z"
								></path>
							</svg>
						</button>
						<button
							className={`btn btn--icon btn--warn ${style.btn}`}
							onClick={() => handleAdd(jobs_response?.jobs?.length - 1)}
						>
							<svg
								width="20"
								height="19"
								viewBox="0 0 20 19"
								fill="inherit"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M11.4929 6.24914L11.9315 7.3415L13.106 7.42113L17.1029 7.69215L14.0286 10.2607L13.1253 11.0155L13.4125 12.1571L14.3898 16.0421L10.997 13.912L10 13.2861L9.00305 13.912L5.61016 16.0421L6.58754 12.1571L6.87472 11.0155L5.97138 10.2607L2.89709 7.69215L6.89403 7.42113L8.06847 7.3415L8.50713 6.24914L10 2.53158L11.4929 6.24914ZM1.83856 5.88462L6.76718 5.55043L8.60805 0.966295C9.1119 -0.288409 10.8881 -0.288406 11.392 0.966298L13.2328 5.55043L18.1615 5.88462C19.5104 5.97609 20.0593 7.66536 19.0217 8.53228L15.2308 11.6996L16.436 16.4903C16.7659 17.8015 15.3289 18.8456 14.1838 18.1266L10 15.5L5.81623 18.1266C4.67111 18.8456 3.23412 17.8015 3.56399 16.4903L4.76919 11.6996L0.978279 8.53228C-0.0593164 7.66536 0.489565 5.97609 1.83856 5.88462Z"
								></path>
							</svg>
						</button>
					</div>
				</>
			) : (
				<form
					onSubmit={handleSubmit}
					noValidate
					className="flex-col m-top see-ya"
				>
					<h1 className="h1">Stay updated!</h1>

					<Input
						type="email"
						placeholder="your@wsome.com"
						name="email"
						autoComplete="email"
						label="Email"
					/>
					{submitResponse && <span>{submitResponse}</span>}
					<button className="btn btn--primary">Subscibe</button>
					<Link href="/" className="a">
						Try another resume
					</Link>
				</form>
			)}
		</div>
	);
}
