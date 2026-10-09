import React, { useState, useEffect } from 'react';
import connectToStore, { IStockDetailProps } from './StockDetailSetup';
import cloneDeep from 'lodash/cloneDeep';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { Helper } from '../../../../Models/BL/Helper';
import { StockHistory } from '../../Models/Entity/State/StockHistory';
import { ControllerHelper } from '../../../../Models/Controllers/ControllerHelper';
import SelectWithSearch from '../../../../components/Body/SelectWithSearch/SelectWithSearch';
import { Stock } from '../../Models/Entity/State/Stock';
import AdditionalWindow from '../../../../components/Body/AdditionalWindow/AdditionalWindow';
import AddStockEvent from '../AddStockEvent/AddStockEvent';
import { StockEvent } from '../../Models/Entity/State/StockEvent';
import { StockEventEnumToString } from '../../Models/Entity/State/Enum/StockEventEnum';
import RouteBuilder from '../../Models/BL/RouteBuilder';
import Paggination from '../../../../components/Body/Paggination/Paggination';
import { AlertData } from '../../../../Models/Entity/AlertData';
import { CreateStockRequest } from '../../Models/Entity/DTO/CreateStockRequest';



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


    const [showNewEventWindow, setShowNewEventWindow] = useState(false);
    const [showEditWindow, setShowEditWindow] = useState(false);

    const [events, setEvents] = useState<StockEvent[]>([]);
    const [eventsPage, setEventsPage] = useState<number>(1);
    const [eventsTotal, setEventsTotal] = useState<number>(-1);


    const [editStockName, setEditStockName] = useState(props.Stock?.Name || '');
    const [editStockCode, setEditStockCode] = useState(props.Stock?.Code || '');


    const pageSize = 10;

    const navigate = useNavigate();

    useEffect(() => {
        props.GetCurrency()
            .then(br => setStockCurrency(br.Data!.map(x => new Stock().FillByIStockDataBack(x))));


        return () => {
            //если с этой страницы будут переходы на другую с сохранением id  в урле то надо переносить на уровень выше
            props.SetCurrentStockId(-1);
            props.ClearCurrentStock();
            props.ClearCurrentHistory();
            setEvents([]);
        }
    }, []);

    useEffect(() => {
        if (props.StockId > 0) {

            props.GetDetail(props.StockId);
        }

    }, [props.StockId]);

    useEffect(() => {
        setEditStockName(props.Stock?.Name || '');
        setEditStockCode(props.Stock?.Code || '');

    }, [props.Stock?.Name, props.Stock?.Code]);

    useEffect(() => {
        if (props.StockId > 0) {

            props.GetHistory(props.StockId, pageSize, props.HistoryPage);
        }

    }, [props.StockId, props.HistoryPage]);

    useEffect(() => {
        if (props.StockId > 0 && props.PortfolioId && props.PortfolioId > 0) {
            LoadEvents(props.StockId, props.PortfolioId, eventsPage);
        }

    }, [props.StockId, props.PortfolioId, eventsPage]);

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

    const { stockId } = useParams();//, portfolioId 
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


    function LoadEvents(stockId: number, portfolioId: number, pageNumber: number) {
        props.GetStockEvents(portfolioId, stockId, pageSize, pageNumber).then(x => {
            if (x.Data) {
                setEvents(x.Data.Data.map(d => new StockEvent().FillByIStockEventDataBack(d)));
                setEventsTotal(x.Data.CountTotal);
            }
        });
    }


    if (!props.Stock) {
        return <div></div>
    }


    const openFromPortfolio = props.PortfolioId && props.PortfolioId > 0;

    const portfolioUrl = new RouteBuilder().PortfolioUrl(props.PortfolioId!);


    return <div className='stock-page'>
        {
            showNewEventWindow ? <AdditionalWindow CloseWindow={() => setShowNewEventWindow(false)}
                IsHeightWindow={false}
                Title='Новое событие'
                InnerContent={() => <AddStockEvent
                    EventAdded={() => { LoadEvents(props.StockId, props.PortfolioId!, eventsPage) }}
                    StockId={props.Stock!.Id}
                />}></AdditionalWindow> : <></>
        }

        {
            showEditWindow ? <AdditionalWindow CloseWindow={() => {
                setEditStockName(props.Stock?.Name || '');
                setEditStockCode(props.Stock?.Code || '');
                setShowEditWindow(false);
            }}
                IsHeightWindow={false}
                Title='Изменение Stock'
                InnerContent={() => <>
                    <input type='text' className='stock-name-input'
                        placeholder='Введите название'
                        value={editStockName}
                        onChange={e => setEditStockName(e.target.value)}></input>
                        <br/>
                    <input type='text' className='stock-code-input'
                        placeholder='Введите код'
                        value={editStockCode}
                        onChange={e => setEditStockCode(e.target.value)}></input>
                        <br/>
                    <button onClick={() => {
                        let newData = new CreateStockRequest();
                        newData.Type = props.Stock!.Type;
                        newData.Id = props.Stock!.Id;
                        newData.IsGlobal = props.Stock!.IsGlobal;
                        newData.Code = editStockCode;
                        newData.Name = editStockName;
                        props.Update(newData)

                    }}>Сохранить изменения</button>
                </>}></AdditionalWindow> : <></>

        }

        <div>
            {openFromPortfolio ? <>
                <a href={portfolioUrl} onClick={(e) => {
                    e.preventDefault();
                    navigate(portfolioUrl);
                }}>Вернуться к портфелю</a>
            </> : <></>}

            <div className='stock-name'>{props.Stock.Code}-{props.Stock.Name}-{props.Stock.Id}</div>
        </div>
        <div className='stock-block'>
            <button onClick={() => setShowEditWindow(true)}>Изменить</button>
            <div className='stock-block-new'>
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
                        setStockCurrencyName(stockCurrency.find(x => x.Id === id)!.Name);
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

            {openFromPortfolio ? <>
                <div><button onClick={() => setShowNewEventWindow(true)}>Добавить событие</button></div>

                <div className='stock-block-events'>
                    <span>События</span>
                    <Paggination
                        ElementsCount={eventsTotal}
                        PageNumber={eventsPage}
                        ElementsOnPage={pageSize}
                        SetPageNumber={(x) => setEventsPage(x)}></Paggination>
                    {events.map(x => {
                        return <div key={x.Id} className='one-event-element'>
                            <div>{x.Date}</div>
                            <div>{new StockEventEnumToString().ToString(x.Type)} {x.Count} штук {x.StockName}, по цене {x.Price} {x.CurrencyName}</div>
                        </div>

                    })}
                </div>
            </> : <></>}


            <div className='stock-block-history'>
                <span>История изменения цены</span>
                <Paggination
                    ElementsCount={props.HistoryTotalCount}
                    PageNumber={props.HistoryPage}
                    ElementsOnPage={pageSize}
                    SetPageNumber={(x) => props.SetHistoryPageNumber(x)}></Paggination>
                {props.StockHistory.map(x => {
                    return <div key={x.Id} className='one-history-element'>
                        <div>{x.Date}</div>
                        <div>{x.Price} {x.CurrencyName}</div>
                        <div className='delete-history-button' onClick={() => {
                            if (window.confirm('Удалить?')) {
                                props.DeleteHistory(x.Id).then(x => {
                                    if (x.Data?.Result) {
                                        let alertFactory = new AlertData();
                                        let alert = alertFactory.GetDefaultNotify("История удалена");
                                        window.G_AddAbsoluteAlertToState(alert);
                                    }

                                })
                            }

                        }}>Удалить историю</div>
                    </div>
                })}
            </div>
        </div>

    </div >
}



// and that function returns the connected, wrapper component:
export default connectToStore(StockDetail);