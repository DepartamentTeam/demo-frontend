import Layout from "@/shared/ui/Layouts/Account/Layout";
import { SignUpForm } from "@/features/forms/Account/SignUp";
import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";


export default function Page() {
	const t = useTranslations("SignUp");
	return (
		<Layout title={t("title")}>
			<SignUpForm />
		</Layout>
	);
}

export async function getStaticProps(context: GetStaticPropsContext) {
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
