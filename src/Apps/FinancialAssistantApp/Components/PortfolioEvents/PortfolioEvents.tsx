import React, { useState, useEffect } from 'react';
import connectToStore, { IPortfolioEventsProps } from './PortfolioEventsSetup';
import cloneDeep from 'lodash/cloneDeep';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';



require('./PortfolioEvents.css');




const PortfolioEvents = (props: IPortfolioEventsProps) => {




    const navigate = useNavigate();




    return <div>HISTORY - {props.PortfolioId}
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