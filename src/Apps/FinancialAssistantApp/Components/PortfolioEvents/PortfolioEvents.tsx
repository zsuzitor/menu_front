import React, { useState, useEffect } from 'react';
import connectToStore, { IPortfolioEventsProps } from './PortfolioEventsSetup';
import cloneDeep from 'lodash/cloneDeep';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import RouteBuilder from '../../Models/BL/RouteBuilder';



require('./PortfolioEvents.css');




const PortfolioEvents = (props: IPortfolioEventsProps) => {




    const navigate = useNavigate();



    const portfolioUrl = new RouteBuilder().PortfolioUrl(props.PortfolioId);

    return <div>HISTORY - {props.PortfolioId}
        <a href={portfolioUrl} onClick={(e) => {
            e.preventDefault();
            navigate(portfolioUrl);
        }}>Вернуться к портфелю</a>
        <div>
            {props.Events.map(x => {
                return <div key={x.Id}>
                    {x.Id}
                    {x.Price}
                    {x.CurrencyId}
                    {x.Count}

                </div>

            })}
        </div>
    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(PortfolioEvents);