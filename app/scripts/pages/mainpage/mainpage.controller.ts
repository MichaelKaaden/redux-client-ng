import { IAppVersionService } from "../../services/appversion.service";
import { IBuildInformation, IBuildInformationService } from "../../services/build-information.service";

export interface IMainPageController {
    appName: string;
    appVersion: string;
    buildInformation: IBuildInformation;
    open: boolean;

    openModal(): void;
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
    public open: boolean;

    constructor(private $route: angular.route.IRouteService,
                private appVersionService: IAppVersionService,
                private buildInformationService: IBuildInformationService) {

        this.open = false;
        this.buildInformationService.getInformation().then((buildInformation) => {
            this.buildInformation = buildInformation;
        });

        this.appVersionService.getVersion().then((result) => {
            this.appName = result.name;
            this.appVersion = result.version;
        });
    }

    public openModal() {
        console.log(`setting open to true`);
        this.open = true;
    }
}
