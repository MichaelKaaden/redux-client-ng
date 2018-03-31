import * as ngRedux from "ng-redux";
import { Counter, ICounter } from "../models/counter.model";
import { CounterService } from "../services/counter.service";
import {
    IDecrementCompletedCounterAction,
    IIncrementCompletedCounterAction,
    ILoadAllCompletedAction,
    ILoadAllPendingAction,
    ILoadCompletedAction,
    ILoadPendingAction,
    ISavePendingAction,
    TypeKeys,
} from "./counter.actions";
import { ErrorsActionCreatorService } from "./errors.action-creator.service";

export interface ICounterActionCreatorService {
    decrement(index: number, by: number);

    increment(index: number, by: number);

    load(index: number);

    loadAll();
}

export class CounterActionCreatorService implements ICounterActionCreatorService {
    public static serviceId = "rdxCounterActionCreatorService";

    public static $inject = [
        "$ngRedux",
        "rdxCounterService",
        "rdxErrorsActionCreatorService",
    ];

    constructor(private $redux: ngRedux.INgRedux,
                private counterService: CounterService,
                private errorActionCreatorService: ErrorsActionCreatorService) {
    }

    /**
     * Decrement a counter by saving it to the RESTful Web Service.
     * Semantics: First change in the RESTful Web Service,
     *            then display in the app.
     *
     * @param {number} index The counter's index
     * @param {number} by The decrement value
     */
    public decrement(index: number, by = 1) {
        if (index < 0) {
            this.errorActionCreatorService.setError("decrement", `index ${index} < 0`);
            return;
        }

        // set "saving" for this counter
        this.$redux.dispatch(this.buildSavePendingAction(index));

        this.counterService.decrementCounter(index, by)
            .then((c) => {
                const counter = new Counter(c.index, c.value);
                this.$redux.dispatch(this.buildDecrementCompletedAction(index, counter));
            })
            .catch((error) => {
                this.errorActionCreatorService.setError("decrement",
                    `decrementing the counter failed with ${error instanceof Error ? error.message : error}`);
            });
    }

    /**
     * Increment a counter by saving it to the RESTful Web Service.
     * Semantics: First change in the RESTful Web Service,
     *            then display in the app.
     *
     * @param {number} index The counter's index
     * @param {number} by The increment value
     */
    public increment(index: number, by = 1) {
        if (index < 0) {
            this.errorActionCreatorService.setError("increment", `index ${index} < 0`);
            return;
        }

        // set "saving" for this counter
        this.$redux.dispatch(this.buildSavePendingAction(index));

        this.counterService.incrementCounter(index, by)
            .then((c) => {
                const counter = new Counter(c.index, c.value);
                this.$redux.dispatch(this.buildIncrementCompletedAction(index, counter));
            })
            .catch((error) => {
                this.errorActionCreatorService.setError("increment",
                    `incrementing the counter failed with ${error instanceof Error ? error.message : error}`);
            });
    }

    /**
     * Loads a counter from the RESTful Web Service.
     * Semantics: First load from the RESTful Web Service,
     *            then add to the app.
     *
     * @param {number} index The counter's index
     */
    public load(index: number) {
        if (index < 0) {
            this.errorActionCreatorService.setError("load", `index ${index} < 0`);
            return;
        }

        // don't load the counter if it's already loaded
        const cachedCounter: ICounter = this.$redux.getState().counters.all.find((item: ICounter) => item.index === index);
        if (cachedCounter) {
            return;
        }

        // set "loading" for this counter
        this.$redux.dispatch(this.buildLoadPendingAction(index));

        this.counterService.counter(index)
            .then((c) => {
                const counter = new Counter(c.index, c.value);
                this.$redux.dispatch(this.buildLoadCompletedAction(index, counter));
            })
            .catch((error) => {
                this.errorActionCreatorService.setError("load",
                    `retrieving the counter failed with ${error instanceof Error ? error.message : error}`);
            });
    }

    /**
     * Load all counters from the RESTful Web Service.
     */
    public loadAll() {
        // set "loading" for this counter
        this.$redux.dispatch(this.buildLoadAllPendingAction());

        this.counterService.counters()
            .then((cs: ICounter[]) => {
                const counters = [];
                for (const c of cs) {
                    counters.push(new Counter(c.index, c.value));
                }
                this.$redux.dispatch(this.buildLoadAllCompletedAction(counters));
            })
            .catch((error) => {
                this.errorActionCreatorService.setError("loadAll",
                    `retrieving all counters failed with ${error instanceof Error ? error.message : error}`);
            });
    }

    private buildDecrementCompletedAction(index: number, counter: ICounter): IDecrementCompletedCounterAction {
        return {
            type: TypeKeys.DECREMENT_COMPLETED,
            payload: {
                index,
                counter,
            },
        };
    }

    private buildIncrementCompletedAction(index: number, counter: ICounter): IIncrementCompletedCounterAction {
        return {
            type: TypeKeys.INCREMENT_COMPLETED,
            payload: {
                index,
                counter,
            },
        };
    }

    private buildLoadAllCompletedAction(counters: ICounter[]): ILoadAllCompletedAction {
        return {
            type: TypeKeys.LOAD_ALL_COMPLETED,
            payload: {
                counters,
            },
        };
    }

    private buildLoadAllPendingAction(): ILoadAllPendingAction {
        return {
            type: TypeKeys.LOAD_ALL_PENDING,
        };
    }

    private buildLoadCompletedAction(index: number, counter: ICounter): ILoadCompletedAction {
        return {
            type: TypeKeys.LOAD_COMPLETED,
            payload: {
                index,
                counter,
            },
        };
    }

    private buildLoadPendingAction(index: number): ILoadPendingAction {
        return {
            type: TypeKeys.LOAD_PENDING,
            payload: {
                index,
            },
        };
    }

    private buildSavePendingAction(index: number): ISavePendingAction {
        return {
            type: TypeKeys.SAVE_PENDING,
            payload: {
                index,
            },
        };
    }
}
