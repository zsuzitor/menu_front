import React, { useState, useEffect } from 'react';
import connectToStore, { IAddStockEventProps } from './AddStockEventSetup';
import cloneDeep from 'lodash/cloneDeep';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import RouteBuilder from '../../Models/BL/RouteBuilder';
import { Stock } from '../../Models/Entity/State/Stock';
import { CreateStockEventRequest } from '../../Models/Entity/DTO/CreateStockEventRequest';
import { Helper } from '../../../../Models/BL/Helper';
import { ControllerHelper } from '../../../../Models/Controllers/ControllerHelper';
import SelectWithSearch from '../../../../components/Body/SelectWithSearch/SelectWithSearch';
import { StockEventEnum } from '../../Models/Entity/State/Enum/StockEventEnum';



require('./AddStockEvent.css');




const AddStockEvent = (props: IAddStockEventProps) => {



    const [countStock, setCountStock] = useState(0);
    const [eventType, setEventType] = useState(+StockEventEnum.Buy);//StockEventEnum
    const [priceStock, setPriceStock] = useState(0);
    const [newStockEventDate, setStockEventDate] = useState<Date>(new Date());
    const [stockCurrencyActions, setStockCurrencyActions] = useState(true);

    // const [newStockPrice, setStockPrice] = useState(0);

    //---
    const [stockCurrency, setStockCurrency] = useState<Stock[]>([]);
    //нужны что бы отрисовать элеммент в пустом списке - тако кейс есть это норм
    const [stockCurrencyId, setStockCurrencyId] = useState(0);
    const [stockCurrencyName, setStockCurrencyName] = useState('');
    //тк запроса на бэк не делаем а просто на фронте фильтруем
    const [stockCurrencyNameFilter, setStockCurrencyNameFilter] = useState('');
    //----

    //
    const [stockId, setStockId] = useState(0);
    const [stockName, setStockName] = useState('');
    const [stocks, setStocks] = useState<Stock[]>([]);
    //


    const navigate = useNavigate();

    useEffect(() => {
        props.GetCurrency()
            .then(br => setStockCurrency(br.Data.map(x => new Stock().FillByIStockDataBack(x))));


        props.FindStocks('').then(searchBack => setStocks(searchBack.Data.map(x => new Stock().FillByIStockDataBack(x))));
        return () => {
        }
    }, []);

    useEffect(() => {
        if (props.PortfolioId > 0) {

        }

    }, [props.PortfolioId]);



    function formatDateTimeToInput(date: Date): string {
        const help = new Helper();
        return help.FormatDateToInputWithTime(date);
    }


    // function formatDateToInput(date: Date): string {
    //     const help = new Helper();
    //     return help.FormatDateToInput(date);
    // }

    const setClearDate = (dt: Date) => {
        let newDt = new Date(dt);
        newDt.setHours(0, 0, 0, 0);
        return newDt;
    }

    return <div className='portfolio-page'>
        <div>
        </div>
        <div>
            <div>

            </div>
            <div>
                <span>stockId</span>
                <SelectWithSearch
                    CancelEvent={() => { }}
                    SaveEvent={(id) => {
                        setStockId(id);
                        setStockName(stocks.find(x => x.Id === id).Name);
                        setStocks(stocks.filter(x => x.Id === id));
                        return true;
                    }}
                    Selected={{ Id: stockId, Text: stockId > 0 ? `${stockId}-${stockName}` : '' }}
                    ValuesWithId={stocks.map(x => ({ Id: x.Id, Text: `${x.Id}-${x.Name}` }))}
                    OnSearchChange={async (text) => {
                        // setTaskId(-1);
                        let searchBack = await props.FindStocks(text);
                        setStocks(searchBack.Data.map(x => new Stock().FillByIStockDataBack(x)));
                    }}
                ></SelectWithSearch>
                <br />

                <span>CurrencyId</span>
                <SelectWithSearch
                    CancelEvent={() => { }}
                    SaveEvent={(id) => {
                        setStockCurrencyId(id);
                        setStockCurrencyName(stockCurrency.find(x => x.Id === id).Name);
                        // setStockCurrency(stockCurrency.filter(x => x.Id === id));
                        return true;
                    }}
                    Selected={{ Id: stockCurrencyId, Text: stockCurrencyId > 0 ? `${stockCurrencyId}-${stockCurrencyName}` : '' }}
                    ValuesWithId={stockCurrency.filter(x => !stockCurrencyNameFilter || x.Name.indexOf(stockCurrencyNameFilter) >= 0)
                        .map(x => ({ Id: x.Id, Text: `${x.Id}-${x.Name}` }))}
                    OnSearchChange={async (text) => {
                        // setTaskId(-1);
                        setStockCurrencyNameFilter(text);
                    }}
                ></SelectWithSearch>

                <br />

                <input type="checkbox" defaultChecked={stockCurrencyActions} onChange={() => setStockCurrencyActions(prev => !prev)} />
                <br />
                <span>Количество</span>
                <input type='number' value={countStock} step="0.01"
                    onChange={(e) => setCountStock(+e.target.value)}></input>
                <br />
                <span>Тип</span>
                {/* <input type='number' value={eventType}
                    onChange={(e) => setEventType(+e.target.value)}></input>
                <br /> */}
                <select className="form-control" value={eventType} onChange={(e) => {

                    setEventType(+e.target.value);
                }}>
                    <option value={`${+StockEventEnum.Buy}`}>Покупка</option>
                    <option value={`${+StockEventEnum.CashReplenishment}`}>Пополнение</option>
                    <option value={`${+StockEventEnum.Dividends}`}>Дивиденды</option>
                    <option value={`${+StockEventEnum.Sell}`}>Продажа</option>
                    <option value={`${+StockEventEnum.WithdrawalCash}`}>Вывод средств</option>
                </select>
                <br />
                <span>Цена</span>
                <input type='number' value={priceStock} step="0.01"
                    onChange={(e) => setPriceStock(+e.target.value)}></input>
                <br />
                <input
                    className=''
                    type="datetime-local"
                    value={formatDateTimeToInput(newStockEventDate)}
                    onChange={(e) => {
                        if (e.target.value) {
                            let dt = new Date(e.target.value);
                            setStockEventDate(setClearDate(dt));
                        }
                        else {
                            setStockEventDate(setClearDate(new Date()));
                        }

                    }}></input>




                <br />
                <button onClick={() => {
                    let dt = new CreateStockEventRequest();
                    dt.StockId = stockId;
                    dt.Count = countStock;
                    dt.CurrencyId = stockCurrencyId;
                    dt.Date = new ControllerHelper().ToZeroDate(newStockEventDate).toISOString();
                    dt.PortfolioId = props.PortfolioId;
                    dt.Price = priceStock;
                    dt.Type = eventType;
                    dt.CurrencyActions = stockCurrencyActions;
                    props.Create(dt).then(x => props.EventAdded());
                }}>Добавить событие</button></div>
        </div>
        <div className='portfolio-elements-block'>



        </div>

    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(AddStockEvent);