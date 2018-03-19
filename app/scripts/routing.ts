import * as angular from "angular";
import { CountersController } from "./components/counters/counters.controller";
import { DashboardController } from "./components/dashboard/dashboard.controller";

angular.module("reduxClientNG")
    .config(["$locationProvider", ($locationProvider) => {
        $locationProvider.html5Mode(true).hashPrefix("!");
    }]);

angular.module("reduxClientNG")
    .config(["$routeProvider", ($routeProvider: angular.route.IRouteProvider) => {
        $routeProvider
            .when("/counters", {
                controller: CountersController,
                controllerAs: "vm",
                template: require("./components/counters/counters.view.html"),
            })
            .when("/dashboard", {
                controller: DashboardController,
                controllerAs: "vm",
                template: require("./components/dashboard/dashboard.view.html"),
            })
            .otherwise({
                redirectTo: "/counters",
            });
    }]);
