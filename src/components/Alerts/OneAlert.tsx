import * as React from "react";
import { AlertDataStored, AlertTypeEnum } from "../../Models/Entity/AlertData";

export interface IOneAlertProps {
    Data: AlertDataStored;
    RemoveALert: (id: number) => void;
}

export class OneAlert extends React.Component<IOneAlertProps, {}> {

    constructor(props: IOneAlertProps) {
        super(props);

        this.Remove = this.Remove.bind(this);
    }

    Remove() {
        this.props.RemoveALert(this.props.Data.Key);
    }

    render() {
        let alertClassDiv = "alert-danger";
        let alertName = "Error";
        if (this.props.Data.Type == AlertTypeEnum.Success) {
            alertClassDiv = "alert-success";
            alertName = "Success"
        }


        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        return <div className='absolute-one-alert'>
            <div className={"alert " + alertClassDiv + " alert-dismissible fade show"} role="alert">
                <strong>{alertName}</strong> {this.props.Data.Text}
                {/* data-dismiss="alert" */}
                <button onClick={this.Remove} type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div >
    }
}
