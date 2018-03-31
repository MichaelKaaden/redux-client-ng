export interface IConfiguration {
    appMode: string;
    apiServer: string;
}

export class Configuration implements IConfiguration {
    public apiServer = "http://localhost:3000";
    public appMode = "development";
}
