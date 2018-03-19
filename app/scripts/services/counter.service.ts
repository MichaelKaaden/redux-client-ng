import * as angular from "angular";

import { ICounter } from "../models/counter.model";
import { ApiUrlsService } from "./api-urls/api-urls.service";
import { IErrorFormattingService } from "./error-formatting.service";

interface IUpdateResourceClass<T> extends angular.resource.IResourceClass<T> {
    update(params: object, data: object): T;
}

export interface ICounterService {
    counter(index: number): angular.IPromise<ICounter>;

    counters(): angular.IPromise<ICounter[]>;

    updateCounter(index: number, value: number): angular.IPromise<ICounter>;

    decrementCounter(index: number, by: number): angular.IPromise<ICounter>;

    incrementCounter(index: number, by: number): angular.IPromise<ICounter>;
}

export class CounterService implements ICounterService {
    public static serviceId = "rdxCounterService";
    public static $inject = [
        "$log",
        "$q",
        "$resource",
        "$timeout",
        "rdxApiUrlsService",
        "rdxErrorFormattingService",
    ];

    private DELAY = 0;

    constructor(private $log: angular.ILogService,
                private $q: angular.IQService,
                private $resource: angular.resource.IResourceService,
                private $timeout: angular.ITimeoutService,
                private apiUrlsService: ApiUrlsService,
                private errorFormattingService: IErrorFormattingService) {
    }

    /**
     * Get a counter.
     *
     * @param index The counter's index
     * @returns {IPromise<TCatch|ICounter>}
     */
    public counter(index: number): angular.IPromise<ICounter> {
        const url = this.apiUrlsService.getCounterUrlTemplate().getNgResourceUrl();
        const counterResource = this.$resource(url, null, {
            get: {
                method: "GET",
                transformResponse: (data: string) => {
                    return angular.fromJson(data).data.counter;
                },
            },
        });
        const params = {index};

        return this.$timeout(() => {
            return counterResource.get(params).$promise.then((result: ICounter) => {
                return result;
            }).catch((error) => {
                this.$log.error("CounterService.counter:",
                    this.errorFormattingService.formatErrorMessage(error));
                return this.$q.reject(error);
            });
        }, this.DELAY);
    }

    /**
     * Get all counters.
     *
     * @returns {IPromise<TCatch|ICounter[]>}
     */
    public counters(): angular.IPromise<ICounter[]> {
        const url = this.apiUrlsService.getCountersUrlTemplate().getNgResourceUrl();
        const countersResource = this.$resource<ICounter>(url, null, {
            query: {
                method: "GET",
                isArray: true,
                transformResponse: (data: string) => {
                    return angular.fromJson(data).data;
                },
            },
        });

        return countersResource.query().$promise.then((result: ICounter[]) => {
            return result;
        }).catch((error) => {
            this.$log.error("CounterService.counters:",
                this.errorFormattingService.formatErrorMessage(error));
            return this.$q.reject(error);
        });
    }

    /**
     * Update a counter's value on the API server.
     *
     * @param index The counter's index
     * @param value The new value
     * @returns {ICounter} The updated counter
     */
    public updateCounter(index: number, value: number): angular.IPromise<ICounter> {
        const url = this.apiUrlsService.setCounterUrlTemplate().getNgResourceUrl();
        const updateResource = this.$resource(url, null, {
            update: {
                method: "PUT",
                transformResponse: (data: string) => {
                    return angular.fromJson(data).data.counter;
                },
            },
        }) as IUpdateResourceClass<angular.resource.IResource<ICounter>>;
        const params = {
            index,
        };

        return updateResource.update(params, {count: value}).$promise.then((result) => {
            return result;
        }).catch((error) => {
            this.$log.error("CounterService.updateCounter:",
                this.errorFormattingService.formatErrorMessage(error));
            return this.$q.reject(error);
        });
    }

    /**
     * Decrements a counter's value on the API server.
     *
     * @param index The counter's index
     * @param by The value by which the counter is decremented
     * @returns {ICounter} The updated counter
     */
    public decrementCounter(index: number, by: number): angular.IPromise<ICounter> {
        const url = this.apiUrlsService.decrementCounterUrlTemplate().getNgResourceUrl();
        const updateResource = this.$resource(url, null, {
            update: {
                method: "PUT",
                transformResponse: (data: string) => {
                    return angular.fromJson(data).data.counter;
                },
            },
        }) as IUpdateResourceClass<angular.resource.IResource<ICounter>>;

        return this.$timeout(() => {
            return updateResource.update({index}, {by}).$promise.then((result) => {
                return result;
            }).catch((error) => {
                this.$log.error("CounterService.decrementCounter:",
                    this.errorFormattingService.formatErrorMessage(error));
                return this.$q.reject(error);
            });
        }, this.DELAY);
    }

    /**
     * Increments a counter's value on the API server.
     *
     * @param index The counter's index
     * @param by The value by which the counter is incremented
     * @returns {ICounter} The updated counter
     */
    public incrementCounter(index: number, by: number): angular.IPromise<ICounter> {
        const url = this.apiUrlsService.incrementCounterUrlTemplate().getNgResourceUrl();
        const updateResource = this.$resource(url, null, {
            update: {
                method: "PUT",
                transformResponse: (data: string) => {
                    return angular.fromJson(data).data.counter;
                },
            },
        }) as IUpdateResourceClass<angular.resource.IResource<ICounter>>;

        return this.$timeout(() => {
            return updateResource.update({index}, {by}).$promise.then((result) => {
                return result;
            }).catch((error) => {
                this.$log.error("CounterService.incrementCounter:",
                    this.errorFormattingService.formatErrorMessage(error));
                return this.$q.reject(error);
            });
        }, this.DELAY);
    }
}
