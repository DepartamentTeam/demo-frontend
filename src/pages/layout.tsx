import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};
// @description: Root Layout
// @param: Children
export default function RootLayout({ children }: Props) {
	return <>{children}</>;
}

