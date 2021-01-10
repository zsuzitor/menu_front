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

}