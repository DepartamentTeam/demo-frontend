import { Flow } from "@/entities/Job/ui/Flow";
import { JobCard, StaticJobCard } from "@/entities/Job/ui/Card";
import { RootLayout } from "@/shared/ui/Layouts/RootLayout/RootLayout";
import { JobNavigation } from "@/entities/Job/ui/Navigation";
import DemoPageLayout from "../layout";
import { Switch } from "@/shared/ui/Switch/Switch";
import { Segments } from "@/shared/ui/Segments/Segments";
import { useJobsStore } from "@/entities/Job/context";

export default function OfferedPage() {
	const {  selected_jobs, removeSelectedJob } = useJobsStore((state) => state);

	return (
		<DemoPageLayout>
			<Segments
				tabs={[
					{
						id: 0,
						
						title: "Offered",
						body: (
							<>
								
								<Flow />
							</>
						),
					},
					{
						id: 1,
						title: "Applied",
						badge: selected_jobs.length > 0 && true,
						body: (
							<div className="flex-col  cards--container">
								{
									selected_jobs.map((job, idx) => <StaticJobCard actions={<button className="btn btn--error" onClick={() => removeSelectedJob(idx)}>Remove</button>}  key={idx} id={idx} {...job}/> )
								}
								
							</div>
						),
					},
				]}
			/>
		</DemoPageLayout>
	);
}

export async function getStaticProps(context) {
	return {
		props: {
			// You can get the messages from anywhere you like. The recommended
			// pattern is to put them in JSON files separated by locale and read
			// the desired one based on the `locale` received from Next.js.
			messages: (await import(`@/shared/i18n/locales/${context.locale}.json`))
				.default,
		},
	};
}
