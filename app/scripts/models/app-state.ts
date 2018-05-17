import { ICounter } from "./counter.model";

export interface ICounterState {
    all: ICounter[];
}

export interface IAppState {
    counters: ICounterState;
    errors: string[];
    router?: any;
}

export const INITIAL_COUNTERS_STATE: ICounterState = {
    all: [],
};

export const INITIAL_ERRORS_STATE: string[] = [];
