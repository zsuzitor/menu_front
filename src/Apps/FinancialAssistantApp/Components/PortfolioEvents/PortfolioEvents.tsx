import React, { useState, useEffect } from 'react';
import connectToStore, { IPortfolioEventsProps } from './PortfolioEventsSetup';
import cloneDeep from 'lodash/cloneDeep';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import RouteBuilder from '../../Models/BL/RouteBuilder';
import { StockEventEnum, StockEventEnumToString } from '../../Models/Entity/State/Enum/StockEventEnum';
import Paggination from '../../../../components/Body/Paggination/Paggination';



require('./PortfolioEvents.css');




const PortfolioEvents = (props: IPortfolioEventsProps) => {


    const pageSize = 10;

    const navigate = useNavigate();



    useEffect(() => {
        if (props.PortfolioId > 0)
            props.LoadPortfolioEvents(props.PortfolioId, pageSize, props.PageNumber, props.TypeEvents);

        return () => {
            // props.ClearPortfolioEvents(props.PortfolioId);
        }
    }, [props.PortfolioId, props.PageNumber, props.TypeEvents]);




    const portfolioUrl = new RouteBuilder().PortfolioUrl(props.PortfolioId);

    let typeEvents = props.TypeEvents || -1;

    return <div className='portfolio-events'>События портфеля id - {props.PortfolioId}
        <a href={portfolioUrl} onClick={(e) => {
            e.preventDefault();
            navigate(portfolioUrl);
        }}>Вернуться к портфелю</a>


        <select className="form-control" value={typeEvents} onChange={(e) => {
            let newVal = +e.target.value;
            if (newVal < 0) {
                newVal = null!;
            }

            props.SetTypePortfolioEvents(newVal);

        }}>
            <option value={`-1`}>Любой</option>
            <option value={`${+StockEventEnum.Buy}`}>{new StockEventEnumToString().ToString(StockEventEnum.Buy)}</option>
            <option value={`${+StockEventEnum.Dividends}`}>{new StockEventEnumToString().ToString(StockEventEnum.Dividends)}</option>
            <option value={`${+StockEventEnum.Sell}`}>{new StockEventEnumToString().ToString(StockEventEnum.Sell)}</option>
            <option value={`${+StockEventEnum.CountChange}`}>{new StockEventEnumToString().ToString(StockEventEnum.CountChange)}</option>
            <option value={`${+StockEventEnum.WithdrawalCash}`}>{new StockEventEnumToString().ToString(StockEventEnum.WithdrawalCash)}</option>
            <option value={`${+StockEventEnum.CashReplenishment}`}>{new StockEventEnumToString().ToString(StockEventEnum.CashReplenishment)}</option>

        </select>
        <Paggination
            ElementsCount={props.TotalEvents}
            PageNumber={props.PageNumber}
            ElementsOnPage={pageSize}
            SetPageNumber={(x) => props.SetPagePortfolioEvents(x)}></Paggination>

        <div className='events-list'>
            {props.Events.map(x => {
                let typeStr = new StockEventEnumToString().ToString(x.Type);
                return <div key={x.Id} className='one-event'>
                    {x.Date} - {typeStr} - {x.Count} шт {x.StockName} по цене {x.Price} - {x.CurrencyName}
                </div>

            })}
        </div>
    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(PortfolioEvents);