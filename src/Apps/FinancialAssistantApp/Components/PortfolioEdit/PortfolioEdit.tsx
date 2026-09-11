import React, { useState, useEffect } from 'react';
import connectToStore, { IPortfolioEditProps } from './PortfolioEditSetup';
import cloneDeep from 'lodash/cloneDeep';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import RouteBuilder from '../../Models/BL/RouteBuilder';
import SelectWithSearch from '../../../../components/Body/SelectWithSearch/SelectWithSearch';



require('./PortfolioEdit.css');




const PortfolioEdit = (props: IPortfolioEditProps) => {

    //нужны что бы отрисовать элеммент в пустом списке - такой кейс есть это норм
    const [portfolioCurrencyId, setPortfolioCurrencyId] = useState(-2);
    const [portfolioCurrencyName, setPortfolioCurrencyName] = useState('');
    //тк запроса на бэк не делаем а просто на фронте фильтруем
    const [portfolioCurrencyNameFilter, setPortfolioCurrencyNameFilter] = useState('');


    const [name, setName] = useState(props.Portfolio?.Name);


    const navigate = useNavigate();




    useEffect(() => {
        if (props.Portfolio) {
            setName(props.Portfolio.Name);
            // setPortfolioCurrencyId(props.Portfolio.CurrencyId);
        }

        if (props.Portfolio?.CurrencyId) {
            setPortfolioCurrencyId(props.Portfolio.CurrencyId);
            setPortfolioCurrencyName(props.Portfolio.CurrencyName);
        }

    }, [props.Portfolio]);

    // useEffect(() => {
    //     if (props.Portfolio?.CurrencyId) {
    //         setPortfolioCurrencyId(props.Portfolio.CurrencyId);
    //         setPortfolioCurrencyName(props.Portfolio.CurrencyName);
    //     }

    // }, [props.Portfolio?.CurrencyId]);


    if (!props.Portfolio) {
        return <div></div>

    }

    let currencyForSearch = props.Currency.filter(x => !portfolioCurrencyNameFilter || x.Name.indexOf(portfolioCurrencyNameFilter) >= 0)
        .map(x => ({ Id: x.Id, Text: `${x.Id}-${x.Name}` }));
    currencyForSearch = [{ Id: -2, Text: 'Не выбрано' }, ...currencyForSearch];
    return <div className='portfolio-edit-page'>
        <span>Название</span>
        <br />
        <input type='text' className='new-portfolio-name-input'
            placeholder='Введите название'
            value={name}
            onChange={e => setName(e.target.value)}></input>


        <span>Валюта портфеля</span>
        <br />
        <SelectWithSearch
            CancelEvent={() => { }}
            SaveEvent={(id) => {
                setPortfolioCurrencyId(id);
                setPortfolioCurrencyName(currencyForSearch.find(x => x.Id === id)?.Text);
                // setStockCurrency(stockCurrency.filter(x => x.Id === id));
                return true;
            }}
            Selected={{ Id: portfolioCurrencyId, Text: `${portfolioCurrencyId}-${portfolioCurrencyName}` }}
            ValuesWithId={currencyForSearch}
            OnSearchChange={async (text) => {
                // setTaskId(-1);
                setPortfolioCurrencyNameFilter(text);
            }}
        ></SelectWithSearch>


        <button onClick={() => {
            props.Update(props.Portfolio.Id, name, portfolioCurrencyId > 0 ? portfolioCurrencyId : null).then(x => {
                if (x.Data) {
                    window.location.reload();
                }
            });

        }}>Сохранить</button>
    </div >
}



// and that function returns the connected, wrapper component:
export default connectToStore(PortfolioEdit);