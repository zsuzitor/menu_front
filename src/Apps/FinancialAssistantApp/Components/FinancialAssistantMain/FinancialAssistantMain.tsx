import React, { useState, useEffect } from 'react';
import connectToStore, { IFinancialAssistantMainProps } from './FinancialAssistantMainSetup';
import cloneDeep from 'lodash/cloneDeep';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { FinancialAssistantAppPortfolioEventsRoute, FinancialAssistantAppPortfolioListRoute, FinancialAssistantAppPortfolioRoute, FinancialAssistantAppRoute, FinancialAssistantAppStockListRoute, FinancialAssistantAppStockRoute } from '../../Models/Consts';
import PortfolioList from '../PortfolioList/PortfolioList';
import StockList from '../StockList/StockList';
import RouteBuilder from '../../Models/BL/RouteBuilder';
import StockDetail from '../StockDetail/StockDetail';
import PortfolioDetail from '../PortfolioDetail/PortfolioDetail';
import PortfolioEvents from '../PortfolioEvents/PortfolioEvents';
import PortfolioRoute from '../PortfolioRoute/PortfolioRoute';



require('./FinancialAssistantMain.css');




const FinancialAssistantMain = (props: IFinancialAssistantMainProps) => {


    useEffect(() => {

    }, []);


    const navigate = useNavigate();

    const portfolioUrl = new RouteBuilder().PortfolioListUrl();
    const stockUrl = new RouteBuilder().StockListUrl();


    // const matchPortfolio = window.location.href.match(/portfolio-(\d+)/);//FinancialAssistantAppPortfolioRoute
    // if (matchPortfolio) {
    //     const idInt = parseInt(matchPortfolio[1], 10);
    //     if (props.CurrentPortfolioId != idInt) {

    //         props.SetCurrentPortfolioId(idInt);
    //     }
    // }
    // else {
    //     if (props.CurrentPortfolioId > 0) {

    //         props.SetCurrentPortfolioId(-1);
    //     }
    // }






    return <div className='financial-assistant-main-app-block'>
        <div>
            <button onClick={() => props.UpdateGlobal()}>
                Обновить глобальные записи
            </button>

            <a href={portfolioUrl} onClick={(e) => {
                e.preventDefault();
                navigate(portfolioUrl);
            }}>Список портфелей</a>

            <a href={stockUrl} onClick={(e) => {
                e.preventDefault();
                navigate(stockUrl);
            }}>Список Stock</a>
        </div>
        <Routes>

            <Route path={`${FinancialAssistantAppPortfolioListRoute}`} element={<PortfolioList />} />
            <Route path={`${FinancialAssistantAppStockListRoute}`} element={<StockList />} />
            <Route path={`${FinancialAssistantAppStockRoute}:stockId`} element={<StockDetail />} />
            {/* <Route path={`${FinancialAssistantAppPortfolioRoute}:portfolioId/${FinancialAssistantAppPortfolioEventsRoute}`} element={<PortfolioEvents />} />
            <Route path={`${FinancialAssistantAppPortfolioRoute}:portfolioId`} element={<PortfolioDetail />} /> */}
            <Route path={`${FinancialAssistantAppPortfolioRoute}:portfolioId/*`} element={<PortfolioRoute />} />


            {/* <Route path={``} element={<PortfolioList />} /> */}


        </Routes>

    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(FinancialAssistantMain);