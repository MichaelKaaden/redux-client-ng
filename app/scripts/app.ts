import * as angular from "angular";
import * as ngRedux from "ng-redux";
import logger from "redux-logger";
import "./app.module";

import { rootReducer } from "./reducers/reducers";
import "./routing";

const main = angular.module("reduxClientNG");

const translateConfig = ($translateProvider: angular.translate.ITranslateProvider) => {
    $translateProvider.registerAvailableLanguageKeys(["en", "de"], {
        "en_*": "en",
        "en-*": "en",
        "de_*": "de",
        "de-*": "de",
        "*": "en",
    });

    $translateProvider.useStaticFilesLoader({
        prefix: "/app/locale/locale-",
        suffix: ".json",
    });

    // register a fallback language (i. e. if an ID isn't available
    // in the chosen language, then use the fallback language)
    $translateProvider.fallbackLanguage("de");

    // set default language
    // $translateProvider.preferredLanguage("en");
    // try to find out preferred language automatically
    $translateProvider.determinePreferredLanguage();

    // enable escaping of HTML
    $translateProvider.useSanitizeValueStrategy("sanitizeParameters");
};
translateConfig.$inject = ["$translateProvider"];
main.config(translateConfig);

const httpConfig = ($httpProvider: angular.IHttpProvider) => {
    $httpProvider.defaults.cache = true;
};
httpConfig.$inject = ["$httpProvider"];
main.config(httpConfig);

const logConfig = ($logProvider: angular.ILogProvider) => {
    $logProvider.debugEnabled(false);
};
logConfig.$inject = ["$logProvider"];
main.config(logConfig);

const reduxConfig = ($ngReduxProvider: ngRedux.INgReduxProvider) => {
    // add enhancer for the Redux DevTools extension
    const enhancers = [];
    if (process.env.NODE_ENV === "development" && (window as any).__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push((window as any).__REDUX_DEVTOOLS_EXTENSION__());
    }

    $ngReduxProvider.createStoreWith(rootReducer, [
        "ngRouterMiddleware",
        logger,
    ], enhancers);
};
reduxConfig.$inject = ["$ngReduxProvider"];
main.config(reduxConfig);
