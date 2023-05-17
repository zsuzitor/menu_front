import * as React from "react";
import { Route, Routes } from "react-router-dom";
// import { IHelloProps } from "../Menu/MenuMain";
import { BodyCardsListMain } from "./CardsList/BodyCardsListMain";
import { OneCardDetailMain } from "./OneCardDetail/OneCardDetailMain";


export class MenuAppMain extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        // return <MainAuth login={true}/>
        // return <BodyCardsListMain />
        //TODO попробовать достучаться незалогиненным по ссылкам и поправить то что вылезет
        // return <BodyCardsListMain/> 
        return <Routes>
            <Route path="/" element={<BodyCardsListMain />} />
            <Route path="/detail/*" element={<OneCardDetailMain UpdateElement={null} />} />

            {/* <Route path="/menu/auth/login" render={(props) => (
                <MainAuth {...props} LoginPage={true} />
            )} />
            <Route path="/menu/auth/register" render={(props) => (
                <MainAuth {...props} LoginPage={false} />
            )} /> */}
            {/* <Route component={NotFound} /> */}
        </Routes>

    }
}
