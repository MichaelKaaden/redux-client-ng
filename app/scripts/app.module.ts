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

import { CountersComponent } from "./components/counters/counters.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { Configuration } from "./configuration";

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
    .component(DashboardComponent.componentId, new DashboardComponent());
angular.module("reduxClientNG.config", [])
    .constant("reduxConfiguration", new Configuration());
angular.module("reduxClientNG.models", []);
angular.module("reduxClientNG.services", []);

