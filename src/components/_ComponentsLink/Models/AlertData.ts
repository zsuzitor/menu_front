import { OneErrorBack } from "../BackModel/ErrorBack";

export class AlertDataStored {
    Key: number;
    Text: string;

    FillByAlertData(data: AlertData) {
        this.Key = data.Key;
        this.Text = data.Text;
    }
}


export class AlertData {
    Key?: number;
    Text: string;

    GetByErrorBack(data: OneErrorBack): AlertData[] {
        let res: AlertData[] = [];
        data.errors.forEach(errBackText => {
            let newAlert = new AlertData();
            newAlert.Text = errBackText;
            // newAlert.Key = data.key;
            res.push(newAlert);
        });

        return res;
    }

}