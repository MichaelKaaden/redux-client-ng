interface IConfiguration {
    appMode: string;
    apiServer: string;
}

export class Configuration implements IConfiguration {
    public apiServer = "https://moria.arda.lan:3001";
    public appMode = "development";
}
