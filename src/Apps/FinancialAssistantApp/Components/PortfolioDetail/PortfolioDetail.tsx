import React, { useState, useEffect } from 'react';
import connectToStore, { IPortfolioDetailProps } from './PortfolioDetailSetup';
import cloneDeep from 'lodash/cloneDeep';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import RouteBuilder from '../../Models/BL/RouteBuilder';
import AdditionalWindow from '../../../../components/Body/AdditionalWindow/AdditionalWindow';
import AddStockEvent from '../AddStockEvent/AddStockEvent';



require('./PortfolioDetail.css');




const PortfolioDetail = (props: IPortfolioDetailProps) => {


    const [showNewEventWindow, setShowNewEventWindow] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            props.CrearPortfolioElements();
            props.ClearCurrentPortfolio();
        }
    }, []);

    useEffect(() => {
        if (props.PortfolioId > 0) {
            props.GetDetail(props.PortfolioId);
            props.LoadPortfolioElements(props.PortfolioId);

        }

    }, [props.PortfolioId]);





    if (!props.Portfolio) {
        return <div></div>

    }
    const portfolioEventsUrl = new RouteBuilder().PortfolioHistoryUrl(props.PortfolioId);

    return <div className='portfolio-page'>
        {
            showNewEventWindow ? <AdditionalWindow CloseWindow={() => setShowNewEventWindow(false)}
                IsHeightWindow={false}
                Title='Новое событие'
                InnerContent={() => <AddStockEvent
                />}></AdditionalWindow> : <></>
        }
        <div>
            <span>{props.Portfolio.Name}</span>
            <span>{props.Portfolio.Id}</span>
        </div>
        <div>
            <div>
                <a href={portfolioEventsUrl} onClick={(e) => {
                    e.preventDefault();
                    navigate(portfolioEventsUrl);
                }}>История</a>
            </div>
            <div><button onClick={() => setShowNewEventWindow(true)}></button></div>
        </div>
        <div className='portfolio-elements-block'>
            {props.Elements.map(x => {
                return <div className='portfolio-element' key={x.Id}>
                    <div>{x.StockId} - {x.Count}
                    </div>
                </div>

            })}


        </div>

    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(PortfolioDetail);