import { Form } from "@/features/forms/Account/New";
import Layout from "@/shared/ui/Layouts/Account/Layout";


export default function SignIn() {
	return (
		<Layout title="Registration" >
			<Form />
		</Layout>
	);
}

export async function getStaticProps(context) {
  return {
    props: {
      // You can get the messages from anywhere you like. The recommended
      // pattern is to put them in JSON files separated by locale and read
      // the desired one based on the `locale` received from Next.js.
      messages: (await import(`@/shared/i18n/locales/${context.locale}.json`)).default
    }
  };
}