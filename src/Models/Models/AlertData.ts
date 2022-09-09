import { OneErrorBack } from "../BackModel/ErrorBack";


export enum AlertTypeEnum { Error = 1, Success = 2 };

export class AlertDataStored {
    Key: number;
    Text: string;
    Type: AlertTypeEnum;

    FillByAlertData(data: AlertData) {
        // this.Key = data.Key;
        this.Text = data.Text;
        this.Type = data.Type;
    }
}


export class AlertData {
    // Key?: number;
    Text: string;
    Type: AlertTypeEnum;
    Timeout?: number;//милисек
    static ErrorTimeoutDefault = 10000;
    static NotifyTimeoutDefault = 5000;

    constructor() {

        this.Timeout = null;
    }

    GetByErrorBack(data: OneErrorBack): AlertData[] {
        let res: AlertData[] = [];
        data.errors.forEach(errBackText => {
            let newAlert = new AlertData();
            newAlert.Text = errBackText;
            newAlert.Type = AlertTypeEnum.Error;
            newAlert.Timeout = AlertData.ErrorTimeoutDefault;
            // newAlert.Key = data.key;
            res.push(newAlert);
        });

        return res;
    }

    GetDefaultError(text: string): AlertData {
        let res = new AlertData();
        res.Type = AlertTypeEnum.Error;
        res.Text = text;
        res.Timeout = AlertData.ErrorTimeoutDefault;
        return res;
    }

    GetDefaultNotify(text: string): AlertData {
        let res = new AlertData();
        res.Type = AlertTypeEnum.Success;
        res.Text = text;
        res.Timeout = AlertData.NotifyTimeoutDefault;
        return res;
    }

}