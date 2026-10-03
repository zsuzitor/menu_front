import React, { useState, useEffect } from 'react';
import connectToStore, { IStatisticPageProps } from './StatisticPageSetup';
import cloneDeep from 'lodash/cloneDeep';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { Helper } from '../../../../Models/BL/Helper';
import SelectWithSearch from '../../../../components/Body/SelectWithSearch/SelectWithSearch';
import { Stock } from '../../Models/Entity/State/Stock';
import { StockEvent } from '../../Models/Entity/State/StockEvent';
import SaveCancelInputMultiSelectWithSearch from '../../../../components/Body/SaveCancelInput/SaveCancelInputMultiSelectWithSearch';
import { IPortfolioStatisticDataBack } from '../../Models/BackModels/IPortfolioStatisticDataBack';



require('./StatisticPage.css');




const StatisticPage = (props: IStatisticPageProps) => {


    const [dateStart, setDateStart] = useState<Date>(new Helper().GetDateWithoutTime(new Date()));
    const [dateEnd, setDateEnd] = useState<Date>(new Helper().GetDateWithoutTime(new Date()));
    const [selectedPortfolioId, setSelectedPortfolioId] = useState<number[]>([]);
    const [statistic, setStatistic] = useState<IPortfolioStatisticDataBack | null>(null);




    const [currency, setCurrency] = useState<Stock[]>([]);
    //нужны что бы отрисовать элеммент в пустом списке - такой кейс есть это норм
    const [currencyId, setCurrencyId] = useState(0);
    const [currencyName, setCurrencyName] = useState('');
    //тк запроса на бэк не делаем а просто на фронте фильтруем
    const [currencyNameFilter, setCurrencyNameFilter] = useState('');





    const [newStockHistoryDate, setStockHistoryDate] = useState<Date>(new Date());
    const [newStockHistoryPrice, setStockHistoryPrice] = useState(0);






    const [showNewEventWindow, setShowNewEventWindow] = useState(false);

    const [events, setEvents] = useState<StockEvent[]>([]);



    const navigate = useNavigate();

    useEffect(() => {
        props.GetCurrency()
            .then(br => setCurrency(br.Data!.map(x => new Stock().FillByIStockDataBack(x))));
        props.LoadPortfolioList();

        return () => {
            setEvents([]);
        }
    }, []);





    function formatDateToInput(date: Date): string {
        const help = new Helper();
        return help.FormatDateToInput(date);

    }





    if (!props.PortfolioList || props.PortfolioList.length == 0) {
        return <div></div>
    }


    return <div className='statistic-page'>
        <span>Дата начала</span>
        <input
            // type="datetime-local"
            type="date"
            // value={timeLogDate.toISOString().slice(0, 16)}
            value={formatDateToInput(dateStart)}
            onChange={(e) => {
                let dt = new Date();
                if (e.target.value) {
                    dt = new Date(e.target.value);
                }

                new Helper().GetDateWithoutTime(dt);
                setDateStart(dt);

            }}></input>

        <span>Дата окончания</span>
        <input
            // type="datetime-local"
            type="date"
            // value={timeLogDate.toISOString().slice(0, 16)}
            value={formatDateToInput(dateEnd)}
            onChange={(e) => {
                let dt = new Date();
                if (e.target.value) {
                    dt = new Date(e.target.value);
                }

                new Helper().GetDateWithoutTime(dt);
                setDateEnd(dt);

            }}></input>


        <span>Валюта</span>
        <SelectWithSearch
            CancelEvent={() => { }}
            SaveEvent={(id) => {
                setCurrencyId(id);
                setCurrencyName(currency.find(x => x.Id === id)!.Name);
                // setStockCurrency(stockCurrency.filter(x => x.Id === id));
                return true;
            }}
            Selected={{ Id: currencyId, Text: currencyId > 0 ? `${currencyId}-${currencyName}` : '' }}
            ValuesWithId={currency.filter(x => !currencyNameFilter || x.Name.indexOf(currencyNameFilter) >= 0)
                .map(x => ({ Id: x.Id, Text: `${x.Id}-${x.Name}` }))}
            OnSearchChange={async (text) => {
                // setTaskId(-1);
                setCurrencyNameFilter(text);
            }}
        ></SelectWithSearch>



        <SaveCancelInputMultiSelectWithSearch
            CancelEvent={() => {
                // setTaskLabelEditable(false)
                setSelectedPortfolioId([]);
            }}
            SaveEvent={(id) => {
                // props.UpdateTaskLabels(props.Task.Id, id);
                setSelectedPortfolioId(id);
                return true;
            }}
            CancelOnSaveNoChanges={true}
            Selected={selectedPortfolioId}
            ValuesWithId={props.PortfolioList.map(x => {
                return { Id: x.Id, Text: x.Name };
            })}
        />

        <button onClick={() => {


            props.GetStatistic(selectedPortfolioId, dateStart, dateEnd, currencyId).then(r => {
                setStatistic(r.Data!);

            })
        }}>Показать статистику</button>

        {statistic ? <>
            <h2>Статистика</h2>
            <div>Сумма на данный момент {statistic.SumNow} {currencyName}</div>
            <div>Сумма на {formatDateToInput(dateStart)} {statistic.SumOnStartPeriod} {currencyName}</div>
            <div>Сумма на  {formatDateToInput(dateEnd)} {statistic.SumOnEndPeriod} {currencyName}</div>

            <div>
                Пополнений в запрошенной валюте(конвертация всех событий) {statistic.CashReplenishmentSum} {currencyName}
                <div>
                    Пополнений по валютам
                    {statistic.ReplenishmentsByCurrency.map(x => <div key={x.CurrencyId}>{x.CurrencySum} {x.CurrencyName}</div>)}
                </div>
            </div>
            <div>
                Выводов в запрошенной валюте(конвертация всех событий) {statistic.WithdrawalCashSum} {currencyName}
                <div>
                    Выводов по валютам
                    {statistic.WithdrawalCashByCurrency.map(x => <div key={x.CurrencyId}>{x.CurrencySum} {x.CurrencyName}</div>)}
                </div>
            </div>

            <div>
                Дивиденды в запрошенной валюте(конвертация всех событий) {statistic.DividendsCashSum} {currencyName}
                <div>
                    Дивиденды по валютам
                    {statistic.DividendsCashByCurrency.map(x => <div key={x.CurrencyId}>{x.CurrencySum} {x.CurrencyName}</div>)}
                </div>
            </div>
        </> : <></>}



    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(StatisticPage);