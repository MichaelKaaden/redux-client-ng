import { IAppVersionService } from "../../services/appversion.service";
import { IBuildInformation, IBuildInformationService } from "../../services/build-information.service";

export interface IMainPageController {
    appName: string;
    appVersion: string;
    buildInformation: IBuildInformation;
    test: string;
}

export class MainPageController implements IMainPageController {
    public static controllerId = "MainPageController";
    public static $inject = [
        "$route",
        "rdxAppVersionService",
        "rdxBuildInformationService",
    ];

    public appName: string;
    public appVersion: string;
    public buildInformation: IBuildInformation;

    constructor(private $route: angular.route.IRouteService,
                private appVersionService: IAppVersionService,
                private buildInformationService: IBuildInformationService) {

        this.buildInformationService.getInformation().then((buildInformation) => {
            this.buildInformation = buildInformation;
        });

        this.appVersionService.getVersion().then((result) => {
            this.appName = result.name;
            this.appVersion = result.version;
        });
    }
}
