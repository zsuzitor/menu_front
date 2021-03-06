import * as React from "react";
import { AppItem } from "../../_ComponentsLink/Models/Poco/AppItem";

export interface AppListItemProps {
    Data: AppItem;
}


export class AppListItem extends React.Component<AppListItemProps, {}> {
    constructor(props: any) {
        super(props);
    }
    render() {
        //offset-md-1
        let imgLogo = this.props.Data.Logo;

        if (this.props.Data.Logo) {
            imgLogo = G_EmptyImagePath;
        }


        return <div className="app-one-item col-sm-12 col-md-3 col-lg-2">
            <div className="app-one-item-inner">
                <img className="persent-100-width-height" src={imgLogo} />
                <a href={this.props.Data.Path}>

                    {this.props.Data.Name}</a>
            </div>


        </div>
    }
}
