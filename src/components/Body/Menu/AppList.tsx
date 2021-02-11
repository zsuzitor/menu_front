import * as React from "react";
import { AppItem } from "../../_ComponentsLink/Models/Poco/AppItem";
import { AppListItem } from "./AppListItem";

export interface AppListState {
    Apps: AppItem[];
}

export class AppList extends React.Component<{}, AppListState> {
    constructor(props: any) {
        super(props);

        let arr: AppItem[] = [
            new AppItem({ Logo: G_EmptyImagePath, Name: "MenuApp", Path: "/menu-app" }),
            new AppItem({ Logo: G_EmptyImagePath, Name: "Dict", Path: "/words-cards-app" }),
            new AppItem({ Logo: G_EmptyImagePath, Name: "TimeBooking", Path: "/menu-app" }),
            new AppItem({ Logo: G_EmptyImagePath, Name: "MenuApp", Path: "/menu-app" }),
            new AppItem({ Logo: G_EmptyImagePath, Name: "MenuApp", Path: "/menu-app" }),
        ];

        this.state = {
            Apps: arr,
        };
    }



    render() {
        return <div className="container"><div className="row">
            {this.state.Apps.map((x, index) =>
                <AppListItem key={index} Data={x} />
            )}


        </div></div>
    }
}
