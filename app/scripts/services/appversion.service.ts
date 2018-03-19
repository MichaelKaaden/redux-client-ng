import * as angular from "angular";
import { IErrorFormattingService } from "./error-formatting.service";

export interface IAppVersion {
    name: string;
    version: string;
}

export class AppVersion {
    constructor(public name: string,
                public version: string) {
    }
}

export interface IServiceVersion {
    name: string;
    version: string;
}

export interface IAppVersionService {
    getVersion(): angular.IPromise<IAppVersion>;
}

export interface IMyResponse {
    version: string;
}

export class AppVersionService implements IAppVersionService {
    public static serviceId = "rdxAppVersionService";
    public static $inject = [
        "$http",
        "$log",
        "$q",
        "rdxErrorFormattingService",
    ];

    constructor(private $http: angular.IHttpService,
                private $log: angular.ILogService,
                private $q: angular.IQService,
                private errorFormattingService: IErrorFormattingService) {
    }

    /**
     * Return the app version information
     *
     * @returns {IPromise<IAppVersion>}
     */
    public getVersion(): angular.IPromise<IAppVersion> {
        return this.$http.get("/app/version.json")
            .then((response) => {
                const data: IMyResponse = response.data as IMyResponse;
                return new AppVersion("redux-client-ng", data.version);
            })
            .catch((error) => {
                this.$log.error("AppVersionService.getVersion:",
                    this.errorFormattingService.formatErrorMessage(error));
                return this.$q.reject(error);
            });
    }
}
