
import { AccountStore, createAccountStore, initAccountNewStore } from "@/shared/store/account";
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

type Resume = {
	position: string;
	setPosition: (position: string) => void;
	file: any | null;
	setFile: (file: any | null) => void;
};

type SearchSettings = {
	country: string;
	setCountry: (country: string) => void;
	allowAnotherCountries: boolean;
	setAllowAnotherCountries: (allowAnotherCountries: boolean) => void;
	city: string;
	setCity: (city: string) => void;
	allowAnotherCity: boolean;
	setAllowAnotherCity: (allowAnotherCity: boolean) => void;
	salary: number;
	setSalary: (salary: number) => void;
};

type ChirpsPlan = {
	position: string;
	plan: "0" | "20" | "50" | "100" | "200" | string;
};

type ActivateChirps = {
	chirps: ChirpsPlan;
	setChirpsPlan: ({ position, plan }: ChirpsPlan) => void;
};

type SubsribePlan = {
	plan?: "Free" | "Basic" | "Premium" | string;
	duration?: "0" | "1" | "3" | "6" | "13" | string;
};

type Subscribe = {
	subscribe: SubsribePlan;
	setSubscribe: ({ plan, duration }: SubsribePlan) => void;
};

type NewAccountContext = Resume & SearchSettings & ActivateChirps & Subscribe;

export const initValue = {
	allowAnotherCity: false,
	allowAnotherCountries: false,
	chirps: { position: "", plan: "0" },
	subscribe: { plan: "", duration: "" },
	city: "",
	country: "",
	duration: "0",
	file: null,
	plan: "",
	position: "",
	salary: 0,
	setPosition: function (position: string) {},
	setAllowAnotherCity: function (allowAnotherCity: boolean) {},
	setAllowAnotherCountries: function (allowAnotherCountries: boolean) {},
	setChirpsPlan: ({ position, plan }: ChirpsPlan) => {},
	setCity: function (city: string) {},
	setCountry: function (country: string) {},
	setFile: () => {},
	setPlan: function (plan: string) {},
	setSalary: function (salary: number) {},
	setSubscribe: ({ plan, duration }: SubsribePlan) => {},
};

export const NewAccountContext = createContext<StoreApi<AccountStore> | null>(
	null,
);

type Props = {
	children: ReactNode;
};

type Action = {
	type: string;
	value: any;
};

function reducer(state: NewAccountContext, action: Action) {
	switch (action.type) {
		case "position":
			return { ...state, position: action.value };
		case "file":
			return { ...state, file: action.value };
		default:
			return state;
	}
}

export function NewAccountProvider({ children }: Props) {
	const storeRef = useRef<StoreApi<AccountStore>>();

	if (!storeRef.current) {
		storeRef.current = createAccountStore(initAccountNewStore());
		
	}

	return (
		<NewAccountContext.Provider value={storeRef.current}>
			{children}
		</NewAccountContext.Provider>
	);
}

export const useAccountStore = <T,>(
	selector: (store: AccountStore) => T,
): T => {
	const accStoreContext = useContext(NewAccountContext);

	if (!accStoreContext) {
		throw new Error(`Error with zustand Store ${accStoreContext}`);
	}

	return useStore(accStoreContext, selector);
};
