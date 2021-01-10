import * as React from "react";
import { AlertDataStored } from "../_ComponentsLink/Models/AlertData";
import { OneAlert } from "./OneAlert";

export interface IMainAlertProps {
    Data?: AlertDataStored[];
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
                return <OneAlert Data={el}></OneAlert>
            })}
        </div>
    }
}
