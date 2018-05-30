export interface IConfiguration {
    appMode: string;
    apiServer: string;
    isReselectDemoMode: boolean;
}

export class Configuration implements IConfiguration {
    public apiServer = "http://localhost:3000";
    public appMode = "development";
    public isReselectDemoMode = false;
}
