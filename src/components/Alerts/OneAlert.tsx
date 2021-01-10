import * as React from "react";
import { AlertDataStored } from "../_ComponentsLink/Models/AlertData";

export interface IOneAlertProps {
    Data: AlertDataStored;
}

export class OneAlert extends React.Component<IOneAlertProps, {}> {

    constructor(props: IOneAlertProps) {
        super(props);
    }

    render() {
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        return <div className='absolute-one-alert' key={'absolute_alert_' + this.props.Data.Key}>
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error</strong> {this.props.Data.Text}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    }
}
