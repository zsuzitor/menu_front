import React, { useState, useEffect } from 'react';
import connectToStore, { IPortfolioDetailProps } from './PortfolioDetailSetup';
import cloneDeep from 'lodash/cloneDeep';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import RouteBuilder from '../../Models/BL/RouteBuilder';
import AdditionalWindow from '../../../../components/Body/AdditionalWindow/AdditionalWindow';
import AddStockEvent from '../AddStockEvent/AddStockEvent';
import { Stock } from '../../Models/Entity/State/Stock';
import PortfolioEdit from '../PortfolioEdit/PortfolioEdit';



require('./PortfolioDetail.css');




const PortfolioDetail = (props: IPortfolioDetailProps) => {


    const [showNewEventWindow, setShowNewEventWindow] = useState(false);
    const [showEditWindow, setShowEditWindow] = useState(false);
    // const [portfolioCurrency, setPortfolioCurrency] = useState(props.Portfolio?.CurrencyId || -1);


    //----------
    const [portfolioCurrencys, setPortfolioCurrencys] = useState<Stock[]>([]);

    //----------


    const navigate = useNavigate();

    useEffect(() => {
        props.GetCurrency()
            .then(br => setPortfolioCurrencys(br.Data.map(x => new Stock().FillByIStockDataBack(x))));
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
                    EventAdded={() => props.LoadPortfolioElements(props.PortfolioId)}
                />}></AdditionalWindow> : <></>
        }
        {
            showEditWindow ? <AdditionalWindow CloseWindow={() => setShowEditWindow(false)}
                IsHeightWindow={true}
                Title='Редактирование проекта'
                InnerContent={() => <PortfolioEdit
                    Portfolio={props.Portfolio}
                    Currency={portfolioCurrencys}
                />}></AdditionalWindow> : <></>
        }


        <div>
            <div className='portfolio-name'>{props.Portfolio.Name} - {props.Portfolio.Id}</div>
            <div>

            </div>
        </div>
        <div className='portfolio-main-buttons-block'>
            <div>
                <a href={portfolioEventsUrl} onClick={(e) => {
                    e.preventDefault();
                    navigate(portfolioEventsUrl);
                }}>История</a>
            </div>
            <div><button onClick={() => setShowNewEventWindow(true)}>Добавить событие</button></div>
            <div><button onClick={() => setShowEditWindow(true)}>Редактировать портфель</button></div>
        </div>
        <p>Состав портфеля</p>
        <div className='portfolio-elements-block'>
            {props.Elements.map(x => {
                return <div className='portfolio-element' key={x.Id}>
                    <div>
                        <div>
                            {x.StockName}
                        </div>
                        <div>
                            {x.Count} шт. по текущей цене {x.Price} {x.CurrencyName}, всего {x.Sum} {x.CurrencyName}
                        </div>
                    </div>
                </div>

            })}


        </div>

    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(PortfolioDetail);