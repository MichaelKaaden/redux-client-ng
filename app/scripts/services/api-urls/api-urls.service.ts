import { IConfiguration } from "../../configuration";
/**
 * Provides API URLs and related helper methods.
 */
import { UrlTemplate } from "./url-template";

export interface IApiUrlsService {

    buildApiUrlTemplate(urlTemplate: string): UrlTemplate;

    interpolateRestUrl(url: string, params: any): string;

    getVersionInformationUrlTemplate(): UrlTemplate;
}

export class ApiUrlsService implements IApiUrlsService {
    public static serviceId = "rdxApiUrlsService";
    public static $inject = ["rdxConfiguration"];

    private API_HOME = ""; // one would use /restApi/v3 here, for example

    private sfApiRootUrl: string;

    constructor(private configuration: IConfiguration) {
        this.sfApiRootUrl = configuration.apiServer + this.API_HOME;
    }

    public buildApiUrlTemplate(urlTemplate: string): UrlTemplate {
        const fPath = this.sfApiRootUrl + urlTemplate;
        return new UrlTemplate(fPath);
    }

    /**
     * Replace ":someId" etc. in the URL with the values from the params object.
     * Typically, you need this whenever you want to use $http as a
     * $resource replacement. Use the code you did for $resource, use this call
     * and put its result in the $http call.
     *
     * @param url the url, e. g. https://foo.bar:1337/baz/:someId
     * @param params object containing the key value pairs
     */
    public interpolateRestUrl(url: string, params: any): string {
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                url = url.indexOf(":" + key, params[key]) > -1 ?
                    url.replace(":" + key, params[key]) :
                    url + "?" + key + "=" + params[key];
            }
        }
        return url;
    }

    // Version information
    public getVersionInformationUrlTemplate(): UrlTemplate {
        return this.buildApiUrlTemplate("/version");
    }
}
