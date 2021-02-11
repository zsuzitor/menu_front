import * as React from "react";
// import { Switch, Route } from "react-router-dom";
import { AppList } from "./AppList";

export interface IHelloProps {
    compiler: string;
    framework: string;
}

export class MenuMain extends React.Component<IHelloProps, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        // return <MainAuth login={true}/>
        // return <BodyCardsListMain />
        //TODO попробовать достучаться незалогиненным по ссылкам и поправить то что вылезет
        // return <BodyCardsListMain/> 
        return <AppList/> 
        // <Switch>
        //     <Route exact path="/menu" component={AppList} />

        // </Switch>

    }
}
