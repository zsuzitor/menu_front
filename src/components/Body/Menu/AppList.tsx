import * as React from "react";
import { AppItem } from "../../../Models/Models/Poco/AppItem";
import { AppListItem } from "./AppListItem";

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
