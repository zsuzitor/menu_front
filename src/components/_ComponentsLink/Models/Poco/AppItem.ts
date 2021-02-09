
export interface IAppItem {
    Logo: string;
    Name: string;
    Path: string;

}


export class AppItem implements IAppItem {
    Logo: string;
    Name: string;
    Path: string;

    public constructor(init?:Partial<AppItem>) {
        Object.assign(this, init);
    }

}
