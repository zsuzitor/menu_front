import * as React from "react";
import { AlertDataStored } from "../../Models/Models/AlertData";
import { OneAlert } from "./OneAlert";

export interface IMainAlertProps {
    Data?: AlertDataStored[];
    RemoveALert: (id: number) => void;
}

export class MainAlertAbsolute extends React.Component<IMainAlertProps, {}> {

    constructor(props: IMainAlertProps) {
        super(props);
    }

    render() {
        if (!this.props.Data) {
            return <div className='main-alert-section'>
            </div>
        }

        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        return <div className='main-alert-section'>
            {this.props.Data.map((el) => {
                return <OneAlert Data={el} RemoveALert={this.props.RemoveALert} key={'absolute_alert_' + el.Key}></OneAlert>
            })}
        </div>
    }
}
