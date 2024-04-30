import { Flow } from "@/entities/Job/ui/Flow";
import { JobCard } from "@/entities/Job/ui/Card";
import { RootLayout } from "@/shared/ui/Layouts/RootLayout/RootLayout";
import { JobNavigation } from "@/entities/Job/ui/Navigation";
import { ReactNode } from "react";
import Logo from "@/shared/ui/Logo/Logo";

type Props = {
	children: ReactNode
}


export default function DemoPageLayout(props: Props) {
	

	return (
		<RootLayout title="Demo" className="lt-jobflow">
			<Logo/>
			{props.children}
		</RootLayout>
	);
}
