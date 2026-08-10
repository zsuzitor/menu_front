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



require('./AddStockEvent.css');




const AddStockEvent = (props: IAddStockEventProps) => {



    const [stockCurrency, setStockCurrency] = useState<Stock[]>([]);
    const [stockId, setStockId] = useState(0);
    const [count, setCount] = useState(0);
    const [price, setPrice] = useState(0);
    const [newStockEventDate, setStockEventDate] = useState<Date>(new Date());

    const [newStockPrice, setStockPrice] = useState(0);

    //нужны что бы отрисовать элеммент в пустом списке - тако кейс есть это норм
    const [stockCurrencyId, setStockCurrencyId] = useState(0);
    const [stockCurrencyName, setStockCurrencyName] = useState('');
    //тк запроса на бэк не делаем а просто на фронте фильтруем
    const [stockCurrencyNameFilter, setStockCurrencyNameFilter] = useState('');



    const navigate = useNavigate();

    useEffect(() => {
        props.GetCurrency()
            .then(br => setStockCurrency(br.Data.map(x => new Stock().FillByIProjectTaskDataBack(x))));
        return () => {
        }
    }, []);

    useEffect(() => {
        if (props.PortfolioId > 0) {

        }

    }, [props.PortfolioId]);



    function formatDateToInput(date: Date): string {
        const help = new Helper();
        return help.FormatDateToInputWithTime(date);
    }



    return <div className='portfolio-page'>
        <div>
        </div>
        <div>
            <div>

            </div>
            <div>
                <SelectWithSearch
                    CancelEvent={() => { }}
                    SaveEvent={(id) => {
                        setStockCurrencyId(id);
                        setStockCurrencyName(stockCurrency.find(x => x.Id === id).Name);
                        // setStockCurrency(stockCurrency.filter(x => x.Id === id));
                        return true;
                    }}
                    Selected={{ Id: newStockCurrencyId, Text: newStockCurrencyId > 0 ? `${newStockCurrencyId}-${stockCurrencyName}` : '' }}
                    ValuesWithId={stockCurrency.filter(x => !stockCurrencyNameFilter || x.Name.indexOf(stockCurrencyNameFilter) >= 0)
                        .map(x => ({ Id: x.Id, Text: `${x.Id}-${x.Name}` }))}
                    OnSearchChange={async (text) => {
                        // setTaskId(-1);
                        setStockCurrencyNameFilter(text);
                    }}
                ></SelectWithSearch>




                <button onClick={() => {
                    let dt = new CreateStockEventRequest();
                    dt.StockId = stockId;
                    dt.Count = count;
                    dt.CurrencyId = stockCurrencyId;
                    dt.Date = new ControllerHelper().ToZeroDate(newStockEventDate).toISOString();
                    dt.PortfolioId = props.PortfolioId;
                    dt.Price = price;
                    dt.Type =;
                    props.Create();
                }}>Добавить событие</button></div>
        </div>
        <div className='portfolio-elements-block'>



        </div>

    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(AddStockEvent);