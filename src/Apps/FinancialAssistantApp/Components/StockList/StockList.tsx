import React, { useState, useEffect } from 'react';
import connectToStore, { IStockListProps } from './StockListSetup';
import cloneDeep from 'lodash/cloneDeep';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SaveCancelInputText from '../../../../components/Body/SaveCancelInput/SaveCancelInputText';
import RouteBuilder from '../../Models/BL/RouteBuilder';
import { CreateStockRequest } from '../../Models/Entity/DTO/CreateStockRequest';
import { StockType } from '../../Models/Entity/State/Enum/StockType';



require('./StockList.css');




const StockList = (props: IStockListProps) => {



    const [newStockName, setNewStockName] = useState("");
    const [newStockCode, setNewStockCode] = useState("");
    const [newStockType, setNewStockType] = useState(0);
    const [newStockIsGlobal, setNewStockIsGlobal] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        props.LoadStockList();
        return () => {
            // props.ClearStockList();//чистить не будем тк используется в stockDetail
        }
    }, []);





    return <div className='stock-list-page'>
        <div>


            <input type='text' className='new-stock-input'
                placeholder='Введите название'
                value={newStockName}
                onChange={e => setNewStockName(e.target.value)}></input>
            <input type='text' className='new-stock-input'
                placeholder='Введите код'
                value={newStockCode}
                onChange={e => setNewStockCode(e.target.value)}></input>
            <select className="form-control" value={newStockType} onChange={(e) => {
                setNewStockType(+e.target.value);
            }}>
                <option value={`${+StockType.InvestmentFund}`}>Фонд</option>
                <option value={`${+StockType.InvestmentStock}`}>Акция</option>
                <option value={`${+StockType.InvestmentBond}`}>Облигация</option>
                <option value={`${+StockType.Other}`}>Другой</option>
                <option value={`${+StockType.Currency}`}>Валюта</option>
            </select>
            <span>Глобальная</span>
            <input type="checkbox" defaultChecked={newStockIsGlobal} onChange={() => setNewStockIsGlobal(prev => !prev)} />
            <button onClick={() => {
                let cr = new CreateStockRequest();
                cr.Code = newStockCode;
                cr.IsGlobal = newStockIsGlobal;
                cr.Name = newStockName;
                cr.Type = newStockType;
                props.Create(cr);
            }}>Создать</button>
        </div>
        <div className='stock-list-block'>
            {props.StockList.map(x => {

                const stockUrl = new RouteBuilder().StockDetailUrl(x.Id);

                return <div className='one-stock-element' key={x.Id}>
                    <div>{x.Name}</div>
                    <div>
                        <button onClick={() => props.Delete(x.Id)}>Удалить</button>
                        <a href={stockUrl} onClick={(e) => {
                            e.preventDefault();
                            navigate(stockUrl);
                        }}>Открыть</a>
                    </div>

                </div>
            })}
        </div>

    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(StockList);