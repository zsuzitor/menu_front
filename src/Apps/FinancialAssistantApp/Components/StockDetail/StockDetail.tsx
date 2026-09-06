import React, { useState, useEffect } from 'react';
import connectToStore, { IStockDetailProps } from './StockDetailSetup';
import cloneDeep from 'lodash/cloneDeep';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { Helper } from '../../../../Models/BL/Helper';
import { StockHistory } from '../../Models/Entity/State/StockHistory';
import { ControllerHelper } from '../../../../Models/Controllers/ControllerHelper';
import SelectWithSearch from '../../../../components/Body/SelectWithSearch/SelectWithSearch';
import { Stock } from '../../Models/Entity/State/Stock';



require('./StockDetail.css');




const StockDetail = (props: IStockDetailProps) => {


    const [newStockHistoryDate, setStockHistoryDate] = useState<Date>(new Date());
    const [newStockHistoryPrice, setStockHistoryPrice] = useState(0);

    const [stockCurrency, setStockCurrency] = useState<Stock[]>([]);
    //нужны что бы отрисовать элеммент в пустом списке - такой кейс есть это норм
    const [newStockHistoryCurrencyId, setStockHistoryCurrencyId] = useState(0);
    const [stockCurrencyName, setStockCurrencyName] = useState('');
    //тк запроса на бэк не делаем а просто на фронте фильтруем
    const [stockCurrencyNameFilter, setStockCurrencyNameFilter] = useState('');


    const navigate = useNavigate();

    useEffect(() => {
        props.GetCurrency()
            .then(br => setStockCurrency(br.Data.map(x => new Stock().FillByIStockDataBack(x))));


        return () => {
            //если с этой страницы будут переходы на другую с сохранением id  в урле то надо переносить на уровень выше
            props.SetCurrentStockId(-1);
            props.ClearCurrentStock();
            props.ClearCurrentHistory();
        }
    }, []);

    useEffect(() => {
        if (props.StockId > 0) {

            props.GetDetail(props.StockId);
            props.GetHistory(props.StockId);
        }

    }, [props.StockId]);

    // const matchStock = window.location.href.match(/stock-(\d+)/);//FinancialAssistantAppStockRoute
    // if (matchStock) {
    //     const idInt = parseInt(matchStock[1], 10);
    //     if (props.StockId != idInt) {
    //         props.SetCurrentStockId(idInt);
    //     }
    // }
    // else {
    //     if (props.StockId > 0) {
    //         props.SetCurrentStockId(-1);
    //     }
    // }

    const { stockId } = useParams();
    useEffect(() => {
        if (stockId) {
            const idInt = parseInt(stockId, 10);
            if (props.StockId !== idInt) {
                props.SetCurrentStockId(idInt);
            }
        } else {
            if (props.StockId > 0) {
                props.SetCurrentStockId(-1);
            }
        }
    }, [stockId, props.StockId]);

    function formatDateToInput(date: Date): string {
        const help = new Helper();
        return help.FormatDateToInputWithTime(date);
    }

    if (!props.Stock) {
        return <div></div>
    }

    return <div className='stock-page'>
        <div>
            <div className='stock-name'>{props.Stock.Code}-{props.Stock.Name}-{props.Stock.Id}</div>
        </div>
        <div className='stock-block'>
            <div>
                <span>Добавить запись истории</span>
                <br />
                <span>Цена</span>
                <input type='number' value={newStockHistoryPrice}
                    onChange={(e) => setStockHistoryPrice(+e.target.value)}></input>
                <br />
                <span>Дата</span><input
                    // type="datetime-local"
                    type="datetime-local"
                    // value={timeLogDate.toISOString().slice(0, 16)}
                    value={formatDateToInput(newStockHistoryDate)}
                    onChange={(e) => {
                        if (e.target.value) {
                            setStockHistoryDate(new Date(e.target.value));
                        }
                        else {
                            setStockHistoryDate(new Date());
                        }

                    }}></input>
                <br />

                <span>Валюта</span>
                <SelectWithSearch
                    CancelEvent={() => { }}
                    SaveEvent={(id) => {
                        setStockHistoryCurrencyId(id);
                        setStockCurrencyName(stockCurrency.find(x => x.Id === id).Name);
                        // setStockCurrency(stockCurrency.filter(x => x.Id === id));
                        return true;
                    }}
                    Selected={{ Id: newStockHistoryCurrencyId, Text: newStockHistoryCurrencyId > 0 ? `${newStockHistoryCurrencyId}-${stockCurrencyName}` : '' }}
                    ValuesWithId={stockCurrency.filter(x => !stockCurrencyNameFilter || x.Name.indexOf(stockCurrencyNameFilter) >= 0)
                        .map(x => ({ Id: x.Id, Text: `${x.Id}-${x.Name}` }))}
                    OnSearchChange={async (text) => {
                        // setTaskId(-1);
                        setStockCurrencyNameFilter(text);
                    }}
                ></SelectWithSearch>

                <br />
                <button onClick={() => {
                    let dt = new StockHistory();
                    dt.CurrencyId = newStockHistoryCurrencyId;
                    dt.Date = new ControllerHelper().ToZeroDate(newStockHistoryDate).toISOString();
                    dt.Price = newStockHistoryPrice;
                    dt.StockId = props.StockId;
                    props.CreateHistory(dt);
                }}>Создать запись истории</button>
            </div>

            <div className='stock-block-history'>
                <span>история</span>
                {props.StockHistory.map(x => {
                    return <div key={x.Id} className='one-history-element'>
                        <div>{x.Date}</div>
                        <div>{x.Price} {x.CurrencyName}</div>
                    </div>

                })}
            </div>
        </div>

    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(StockDetail);