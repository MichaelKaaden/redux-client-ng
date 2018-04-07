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
import "ng-redux";
import ngReduxRouter from "ng-redux-router";

import "../sass/main.scss";
import { CounterActionCreatorService } from "./actions/counter.action-creator.service";
import { ErrorsActionCreatorService } from "./actions/errors.action-creator.service";

import { CounterContainerComponent } from "./components/counter-container/counter-container.component";
import { CounterHeadingComponent } from "./components/counter-heading/counter-heading.component";
import { CounterListComponent } from "./components/counter-list/counter-list.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ErrorsComponent } from "./components/errors/errors.component";
import { NumberInputComponent } from "./components/number-input/number-input.component";
import { Configuration } from "./configuration";
import { MainPageComponent } from "./pages/mainpage/mainpage.component";
import { ApiUrlsService } from "./services/api-urls/api-urls.service";
import { AppVersionService } from "./services/appversion.service";
import { BuildInformationService } from "./services/build-information.service";
import { CounterService } from "./services/counter.service";
import { ErrorFormattingService } from "./services/error-formatting.service";

angular.module("reduxClientNG",
    [
        "ngCookies",
        "ngRedux",
        ngReduxRouter,
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
    .component(CounterContainerComponent.componentId, new CounterContainerComponent())
    .component(CounterHeadingComponent.componentId, new CounterHeadingComponent())
    .component(CounterListComponent.componentId, new CounterListComponent())
    .component(DashboardComponent.componentId, new DashboardComponent())
    .component(ErrorsComponent.componentId, new ErrorsComponent())
    .component(MainPageComponent.componentId, new MainPageComponent())
    .component(NumberInputComponent.componentId, new NumberInputComponent());

angular.module("reduxClientNG.config", [])
    .constant("rdxConfiguration", new Configuration());

angular.module("reduxClientNG.services", [])
    .service(ApiUrlsService.serviceId, ApiUrlsService)
    .service(AppVersionService.serviceId, AppVersionService)
    .service(BuildInformationService.serviceId, BuildInformationService)
    .service(CounterActionCreatorService.serviceId, CounterActionCreatorService)
    .service(CounterService.serviceId, CounterService)
    .service(ErrorFormattingService.serviceId, ErrorFormattingService)
    .service(ErrorsActionCreatorService.serviceId, ErrorsActionCreatorService);
