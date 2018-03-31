/**
 * A utility class to work with templated urls, a templated url "/api/v3/mwhs/{mwhId}".
 */
import { IKeyValuePair } from "./key-value-pair";

export class UrlTemplate {

    constructor(public urlTemplate: string) {

    }

    /**
     * Expands this url template with a given key value pair.
     *
     * @param kvPair template name and value
     * @returns expanded url
     */
    public expandTuple(kvPair: IKeyValuePair<string, string>): string {
        return this.urlTemplate.replace(`{${kvPair[0]}}`, kvPair[1]);
    }

    /**
     * Expands this url template with a given list of key value pairs.
     *
     * @param tuples a list of tuples with a template name and value
     * @returns expanded url
     */
    public expandTuples(tuples: Array<IKeyValuePair<string, string>>): string {
        return tuples.reduce((prev, curr) => prev.replace("{" + curr[0] + "}", curr[1]), this.urlTemplate);
    }

    /**
     * Replaces all templates ending with "Id" (e.g. "{mwhId}") with "[0-9][a-zA-Z\-]*".
     *
     * @returns {RegExp} A RegExp object to use with $httpBackend to mock $resource resources.
     */
    public getNgResourceRegExp(): RegExp {
        // Regular expression: starts with "{", multiple characters in range [0-9]|[a-zA-Z\-], ends with "Id}"
        return new RegExp(this.urlTemplate.replace(/{[a-zA-Z]*Id}/g, "([0-9]|[a-zA-Z\-])*"));
    }

    /**
     * Returns a $resource compatible url template to work with $resource service.
     *
     * @returns {string} A $resource compatible url template.
     */
    public getNgResourceUrl(): string {
        return this.urlTemplate.replace(/{/g, ":").replace(/}/g, "");
    }

    /**
     * Appends a given template to this template, can be used to extend a base url with different url parts.
     *
     * @param templateToAppend A url template string, e.g. "/users/{userId}".
     */
    public appendUrlTemplate(templateToAppend: string) {
        this.urlTemplate += templateToAppend;
    }

}
