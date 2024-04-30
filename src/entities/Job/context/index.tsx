
import { JobsState, JobsStore, createJobStore , initJobStore } from "@/shared/store/job";
import {
	Dispatch,
	ReactNode,
	createContext,
	useReducer,
	useRef,
	useState,
	useContext,
} from "react";
import { type StoreApi, useStore } from "zustand";


export const JobsContext = createContext<StoreApi<JobsStore> | null>(
	null,
);

type Props = {
	children: ReactNode;
};




export function JobsProvider({ children }: Props) {
	const storeRef = useRef<StoreApi<JobsStore>>();

	if (!storeRef.current) {
		storeRef.current = createJobStore(initJobStore());
		
	}

	return (
		<JobsContext.Provider value={storeRef.current}>
			{children}
		</JobsContext.Provider>
	);
}

export const useJobsStore = <T,>(
	selector: (store: JobsStore) => T,
): T => {
	const accStoreContext = useContext(JobsContext);

	if (!accStoreContext) {
		throw new Error(`Error with zustand Store ${accStoreContext}`);
	}

	return useStore(accStoreContext, selector);
};
