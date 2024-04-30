import style from "./navigation.module.css";
import { useJobsStore } from "../context";
import Link from "next/link";

export function JobNavigation() {
	const { selected_jobs, jobs_response } = useJobsStore((state) => state);

	return (
		<div className={style.container}>
			<Link href="/demo/offered"  className={style.card}>
				<div className={style.title}>Offered</div>
				<span className={style.count}>{jobs_response?.num_jobs}</span>
			</Link>
			<Link href="/demo/applied" className={style.card}>
				<div className={style.title}>Applying</div>
				<span className={style.count}>{selected_jobs?.length}</span>
			</Link>
		</div>
	);
}
