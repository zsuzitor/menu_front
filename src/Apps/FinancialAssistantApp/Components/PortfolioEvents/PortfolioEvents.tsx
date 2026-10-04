import React, { useState, useEffect } from 'react';
import connectToStore, { IPortfolioEventsProps } from './PortfolioEventsSetup';
import cloneDeep from 'lodash/cloneDeep';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import RouteBuilder from '../../Models/BL/RouteBuilder';
import { StockEventEnumToString } from '../../Models/Entity/State/Enum/StockEventEnum';



require('./PortfolioEvents.css');




const PortfolioEvents = (props: IPortfolioEventsProps) => {




    const navigate = useNavigate();



    useEffect(() => {
        if (props.PortfolioId > 0)
            props.LoadPortfolioEvents(props.PortfolioId);

        return () => {
            props.ClearPortfolioEvents(props.PortfolioId);
        }
    }, [props.PortfolioId]);




    const portfolioUrl = new RouteBuilder().PortfolioUrl(props.PortfolioId);

    return <div className='portfolio-events'>События портфеля id - {props.PortfolioId}
        <a href={portfolioUrl} onClick={(e) => {
            e.preventDefault();
            navigate(portfolioUrl);
        }}>Вернуться к портфелю</a>
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