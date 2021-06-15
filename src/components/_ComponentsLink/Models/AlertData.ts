import { OneErrorBack } from "../BackModel/ErrorBack";


export enum AlertTypeEnum { Error = 1, Success = 2 };

export class AlertDataStored {
    Key: number;
    Text: string;
    Type: AlertTypeEnum;

    FillByAlertData(data: AlertData) {
        this.Key = data.Key;
        this.Text = data.Text;
        this.Type = data.Type;
    }
}


export class AlertData {
    Key?: number;
    Text: string;
    Type: AlertTypeEnum;
    Timeout?: number;

    constructor() {

        this.Timeout = null;
    }

    GetByErrorBack(data: OneErrorBack): AlertData[] {
        let res: AlertData[] = [];
        data.errors.forEach(errBackText => {
            let newAlert = new AlertData();
            newAlert.Text = errBackText;
            newAlert.Type = AlertTypeEnum.Error
            // newAlert.Key = data.key;
            res.push(newAlert);
        });

        return res;
    }

}