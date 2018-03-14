import * as angular from "angular";

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
    ];

    constructor(private $http: angular.IHttpService,
                private $log: angular.ILogService) {
    }

    /**
     * Return the app version information
     *
     * @returns {IPromise<IAppVersion>}
     */
    public getVersion(): angular.IPromise<IAppVersion> {
        return this.$http.get("/app/version.json").then((response) => {
            // TODO that's very ugly code -- need to improve on this!
            const data: IMyResponse = response.data as IMyResponse;
            return new AppVersion("redux-client", data.version);
        });
    }
}
