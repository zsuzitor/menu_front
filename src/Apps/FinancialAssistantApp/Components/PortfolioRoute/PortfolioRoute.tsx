import React, { useState, useEffect } from 'react';
import connectToStore, { IPortfolioRouteProps } from './PortfolioRouteSetup';
import cloneDeep from 'lodash/cloneDeep';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import RouteBuilder from '../../Models/BL/RouteBuilder';
import { FinancialAssistantAppPortfolioEventsRoute } from '../../Models/Consts';
import PortfolioEvents from '../PortfolioEvents/PortfolioEvents';
import PortfolioDetail from '../PortfolioDetail/PortfolioDetail';



require('./PortfolioRoute.css');




const PortfolioRoute = (props: IPortfolioRouteProps) => {




    const { portfolioId } = useParams();
    useEffect(() => {
        if (portfolioId) {
            const idInt = parseInt(portfolioId, 10);
            if (props.PortfolioId !== idInt) {
                props.SetCurrentPortfolioId(idInt);
            }
        } else {
            if (props.PortfolioId > 0) {
                props.SetCurrentPortfolioId(-1);
            }
        }
    }, [portfolioId, props.PortfolioId]);

    const navigate = useNavigate();

    return <>
        <Routes>

            <Route path={`${FinancialAssistantAppPortfolioEventsRoute}`} element={<PortfolioEvents />} />
            <Route path={``} element={<PortfolioDetail />} />

        </Routes>

    </>
}



// and that function returns the connected, wrapper component:
export default connectToStore(PortfolioRoute);