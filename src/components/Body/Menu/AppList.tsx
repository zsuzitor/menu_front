import * as React from "react";
import { AppItem } from "../../../Models/Models/Poco/AppItem";
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
            new AppItem({ Logo: G_EmptyImagePath, Name: "PlaningPoker", Path: "/planing-poker" }),
            new AppItem({ Logo: G_EmptyImagePath, Name: "Code review", Path: "/code-review/" }),
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
