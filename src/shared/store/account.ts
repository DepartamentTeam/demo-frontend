import { createStore } from "zustand/vanilla";

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

type AccountState = {
	account: NewAccountContext;
};

export const initAccountNewStore = (): AccountState => {
	return {
		account: {
			allowAnotherCity: false,
			allowAnotherCountries: false,
			chirps: { position: "", plan: "0" },
			subscribe: { plan: "", duration: "" },
			city: "",
			country: "",
			duration: "",
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
		},
	};
};

type AccountActions = {
	setPosition: (newPosition: string) => void;
	setAllowAnotherCity: (value: boolean) => void;
	setAllowAnotherCountries: (value: boolean) => void;
	setChirpsPlan: (value: ChirpsPlan) => void;
	setCity: (value: string) => void;
	setCountry: (value: string) => void;
	setFile: (newFile: any) => void;
	setPlan: (value: SubsribePlan) => void;
	setSalary: (value: string) => void;
	setSubscribe: (value: string) => void;
};

export const defaultInitState: AccountState = {
	account: {
		allowAnotherCity: false,
		allowAnotherCountries: false,
		chirps: { position: "", plan: "0" },
		subscribe: { plan: "", duration: "" },
		city: "",
		country: "",
		duration: "",
		file: null,
		plan: "",
		position: "",
		salary: 0,
	},
};

export type AccountStore = AccountState & AccountActions;

export const useNewAccountStore = createStore();

export const createAccountStore = (
	initState: AccountState = defaultInitState,
) => {
	return createStore<AccountStore>()((set) => ({
		...initState,
		setPosition: (newPosition: string) =>
			set((state) => ({
				account: {
					...state.account,
					position: newPosition,
				},
			})),
		setFile: (newFile: any) =>
			set((state) => ({
				account: {
					...state.account,
					file: newFile,
				},
			})),
		setAllowAnotherCity: (value: boolean) =>
			set((state) => ({
				account: {
					...state.account,
					allowAnotherCity: value,
				},
			})),
		setAllowAnotherCountries: (value: boolean) =>
			set((state) => ({
				account: {
					...state.account,
					allowAnotherCountries: value,
				},
			})),
		setChirpsPlan: (value: ChirpsPlan) =>
			set((state) => ({
				account: {
					...state.account,
					chirps: {
						plan: value.plan,
						position: value.position,
					},
				},
			})),
		setCity: (value) =>
			set((state) => ({
				account: {
					...state.account,
					city: value,
				},
			})),

		setCountry: (value) =>
			set((state) => ({
				account: {
					...state.account,
					country: value,
				},
			})),
		setPlan: (value: SubsribePlan) =>
			set((state) => ({
				account: {
					...state.account,
					subscribe: {
						plan: value.plan,
						duration: value.duration,
					},
				},
			})),
		setSalary: (value: string) =>
			set((state) => ({
				account: {
					...state.account,
					salary: value,
				},
			})),
	}));
};
