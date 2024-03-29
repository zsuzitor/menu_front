import * as React from "react";
import { AppItem } from "../../../../Models/Entity/AppItem";
import {
    Link,
    BrowserRouter
} from "react-router-dom";



require('./AppListItem.css');



export interface AppListItemProps {
    Data: AppItem;
}




const AppListItem = (props: AppListItemProps) => {
    //offset-md-1
    let imgLogo = props.Data.Logo;

    if (!props.Data.Logo) {
        imgLogo = G_EmptyImagePath;
    }


    return <div className="app-one-item col-sm-4 col-md-3 col-lg-2 col-6">
        <div className="app-one-item-inner">

            <Link
                to={props.Data.Path}><img className="persent-100-width-height" src={imgLogo} />
                {props.Data.Name}</Link>
            {/* <a href={props.Data.Path}>
                <img className="persent-100-width-height" src={imgLogo} />
                {props.Data.Name}</a> */}
        </div>
    </div>
}

export default AppListItem;
