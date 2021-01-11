import * as React from "react";
import { AlertDataStored } from "../_ComponentsLink/Models/AlertData";

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
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        return <div className='absolute-one-alert'>
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error</strong> {this.props.Data.Text}
                {/* data-dismiss="alert" */}
                <button onClick={this.Remove} type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    }
}
