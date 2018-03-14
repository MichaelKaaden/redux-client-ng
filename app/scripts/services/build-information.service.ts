import * as angular from "angular";
import { IErrorFormattingService } from "./error-formatting.service";

export interface IBuildInformation {
    branch: string;
    buildServer: string;
    buildTime: string;
    origin: string;
    revision: string;
}

export class BuildInformation {
    constructor(public branch: string,
                public buildServer: string,
                public buildTime: string,
                public origin: string,
                public revision: string) {
    }
}

export interface IBuildInformationService {
    getInformation(): angular.IPromise<IBuildInformation>;
}

interface IGitRepsonse {
    branch: string;
    originUrl: string;
    SHA: string;
    shortSHA: string;
}

interface IMyResponse {
    buildServer: string;
    buildTime: string;
    git: IGitRepsonse;
}

export class BuildInformationService implements IBuildInformationService {
    public static serviceId = "rdxBuildInformationService";
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

    public getInformation(): angular.IPromise<IBuildInformation> {
        return this.$http.get("/app/build-information.json")
            .then((response) => {
                const data: IMyResponse = response.data as IMyResponse;
                let buildInformation: IBuildInformation;
                buildInformation = new BuildInformation(data.git.branch, data.buildServer, data.buildTime,
                    data.git.originUrl, data.git.shortSHA);
                return buildInformation;
            })
            .catch((error) => {
                this.$log.error("BuildInformationService.getInformation:",
                    this.errorFormattingService.formatErrorMessage(error));
                return this.$q.reject(error);
            });
    }
}
