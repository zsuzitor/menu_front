import React, { useState, useEffect } from 'react';
import connectToStore, { IPortfolioEventsProps } from './PortfolioEventsSetup';
import cloneDeep from 'lodash/cloneDeep';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import RouteBuilder from '../../Models/BL/RouteBuilder';
import { StockEventEnum } from '../../Models/Entity/State/Enum/StockEventEnum';



require('./PortfolioEvents.css');




const PortfolioEvents = (props: IPortfolioEventsProps) => {




    const navigate = useNavigate();



    const portfolioUrl = new RouteBuilder().PortfolioUrl(props.PortfolioId);

    return <div className='portfolio-events'>События портфеля id - {props.PortfolioId}
        <a href={portfolioUrl} onClick={(e) => {
            e.preventDefault();
            navigate(portfolioUrl);
        }}>Вернуться к портфелю</a>
        <div>
            {props.Events.map(x => {
                let typeStr = '';
                switch (x.Type) {
                    case StockEventEnum.Buy:
                        typeStr = 'Покупка';
                        break;
                    case StockEventEnum.CashReplenishment:
                        typeStr = 'Пополнение';
                        break;
                    case StockEventEnum.Dividends:
                        typeStr = 'Дивиденды';
                        break;
                    case StockEventEnum.Sell:
                        typeStr = 'Продажа';
                        break;
                    case StockEventEnum.WithdrawalCash:
                        typeStr = 'Вывод средств';
                        break;
                    case StockEventEnum.CountChange:
                        typeStr = 'Изменение количества';
                        break;
                }


                return <div key={x.Id} className='one-event'>
                    {x.Date} - {typeStr} - {x.Count} шт {x.StockName} по цене {x.Price} - {x.CurrencyName}
                </div>

            })}
        </div>
    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(PortfolioEvents);