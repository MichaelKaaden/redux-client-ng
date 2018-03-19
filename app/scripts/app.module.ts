import * as angular from "angular";
import "angular-cookies";
import "angular-materialize";
import "angular-resource";
import "angular-route";
import "angular-touch";
import "angular-translate";
import "angular-translate-loader-static-files";
import "es6-shim";
import "jquery";
import "materialize-css";
/*
 * Styles
 */
import "../sass/main.scss";

import { CountersComponent } from "./components/counter-list/counter-list.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HeadingComponent } from "./components/heading/heading.component";
import { NumberInputComponent } from "./components/number-input/number-input.component";
import { Configuration } from "./configuration";
import { MainPageComponent } from "./pages/mainpage/mainpage.component";
import { ApiUrlsService } from "./services/api-urls/api-urls.service";
import { AppVersionService } from "./services/appversion.service";
import { BuildInformationService } from "./services/build-information.service";
import { ErrorFormattingService } from "./services/error-formatting.service";

angular.module("reduxClientNG",
    [
        "ngCookies",
        "ngResource",
        "ngRoute",
        "ngTouch",
        "pascalprecht.translate",
        "reduxClientNG.config",
        "reduxClientNG.components",
        "reduxClientNG.services",
        "ui.materialize",
    ]);

/*
 * register modules
 */
angular.module("reduxClientNG.components", [])
    .component(CountersComponent.componentId, new CountersComponent())
    .component(DashboardComponent.componentId, new DashboardComponent())
    .component(HeadingComponent.componentId, new HeadingComponent())
    .component(MainPageComponent.componentId, new MainPageComponent())
    .component(NumberInputComponent.componentId, new NumberInputComponent());

angular.module("reduxClientNG.config", [])
    .constant("reduxConfiguration", new Configuration());

angular.module("reduxClientNG.services", [])
    .service(ApiUrlsService.serviceId, ApiUrlsService)
    .service(AppVersionService.serviceId, AppVersionService)
    .service(BuildInformationService.serviceId, BuildInformationService)
    .service(ErrorFormattingService.serviceId, ErrorFormattingService);
