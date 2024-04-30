import { useState } from "react";
import type { ReactNode } from "react";
import styles from "./segments.module.css";

type Tab = {
    id: number;
	title: string | ReactNode;
	badge?: boolean; 
	body: ReactNode;
	
};

type Props = {
	tabs: Tab[];
	className?: string;
};

export function Segments({ tabs, className }: Props) {

	const [tabId, setTabId] = useState(0);

	function handleSetTabId(id: number) {
		setTabId(id);
	}

	return (
		<>
			<div className={`${styles.controls} ${className && className}`}>
				{tabs.map((tab) => (
					
					<button className={tabId == tab.id ? `${styles.active} ${styles.control}` : styles.control}
					 onClick={() => handleSetTabId(tab.id)}
					key={tab.id}>{tab.title} {tab.badge && <span className={styles.badge}>  </span>} </button>
				))}
			</div>

			{tabs[tabId].body}
		</>
	);
}
