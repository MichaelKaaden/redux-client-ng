import * as angular from "angular";

angular.module("reduxClientNG")
    .config(["$locationProvider", ($locationProvider) => {
        $locationProvider.html5Mode(true).hashPrefix("!");
    }]);

angular.module("reduxClientNG")
    .config(["$routeProvider", ($routeProvider: angular.route.IRouteProvider) => {

        $routeProvider
            .when("/counters", {
                controller: "CountersController+",
                controllerAs: "vm",
                template: require("./components/counters/counters.component.html"),
            })
            .when("/dashboard", {
                controller: "DashboardController",
                controllerAs: "vm",
                template: require("./components/dashboard/dashboard.component"),
            })
            .otherwise({
                redirectTo: "/counters",
            });
    }]);
