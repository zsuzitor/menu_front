import * as React from "react";
import { AppItem } from "../../../../Models/Models/Entity/AppItem";
import AppListItem from "../AppListItem/AppListItem";



require('./AppList.css');


export interface AppListState {
    Apps: AppItem[];
}

export interface IAppListProps {
    Apps: AppItem[];
}


const AppList = (props: IAppListProps) => {

    return <div className="container"><div className="row">
        {props.Apps.map((x, index) =>
            <AppListItem key={index} Data={x} />
        )}


    </div></div>
}

export default AppList;
