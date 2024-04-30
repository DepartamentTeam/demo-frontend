import "../app/style/global.css";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import Head from "next/head";
import { CounterStoreProvider } from "@/features/forms/Account/New/context/counter";
import { NewAccountProvider } from "@/features/forms/Account/New/context";
import { JobsProvider } from "@/entities/Job/context";

// export function generateStaticParams() {
//   return i18nConfig.locales.map(locale => ({ locale }));
// }

export default function App({ Component, pageProps }: AppProps) {
	// Use the layout defined at the page level, if available

	const router = useRouter();

	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" sizes="32x32" />
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
			</Head>

			<NextIntlClientProvider
				locale={router.locale}
				timeZone="Europe/Rome"
				messages={pageProps.messages}
			>
				<JobsProvider>
					<NewAccountProvider>
						<Component {...pageProps} />
					</NewAccountProvider>
				</JobsProvider>
			</NextIntlClientProvider>
		</>
	);
}
