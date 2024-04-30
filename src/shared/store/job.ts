import { createStore } from "zustand/vanilla";

type JobResponse = {
	num_jobs: number;
	requested_title: string;
	jobs: [];
};

export type JobsState = {
	jobs_response: JobResponse | undefined;
	selected_jobs: [];
};

export type JobsActions = {
	setJobs: (jobs: []) => void;
	setResponse: (response: JobResponse) => void;
	dropJob: (id: number) => void;
	addJob: (job) => void;
	removeSelectedJob: (id: number) => void;
};

export type JobsStore = JobsState & JobsActions;

export const initJobStore = (): JobsState => {
	return {
		jobs_response: {
			jobs: [],
			num_jobs: 0,
			requested_title: "",
		},

		selected_jobs: [],
	};
};

export const defaultInitState: JobsState = {
	jobs_response: undefined,
	selected_jobs: [],
};

export const createJobStore = (initState: JobsState = defaultInitState) => {
	return createStore<JobsStore>()((set) => ({
		...initState,
		setResponse: (value) => set((state) => ({ jobs_response: value })),
		setJobs: (jobs: []) =>
			set((state) => ({
				jobs_response: {
					...state.jobs_response,
					jobs: jobs,
				},
			})),
		dropJob: (id: number) =>
			set((state) => ({
				jobs_response: {
					...state.jobs_response,
					jobs: jobs.filter((_, idx) => idx != id),
				},
			})),
		removeSelectedJob: (id) =>
			set((state) => ({
				selected_jobs: state.selected_jobs.filter((_, idx) => idx != id),
			})),
		addJob: (job) =>
			set((state) => ({
				selected_jobs: [job, ...state.selected_jobs],
			})),
	}));
};
