import React, { useState, useEffect } from 'react';
import connectToStore, { IStockDetailProps } from './StockDetailSetup';
import cloneDeep from 'lodash/cloneDeep';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';



require('./StockDetail.css');




const StockDetail = (props: IStockDetailProps) => {





    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            //если с этой страницы будут переходы на другую с сохранением id  в урле то надо переносить на уровень выше
            props.SetCurrentStockId(-1);
            props.ClearCurrentStock();
        }
    }, []);

    useEffect(() => {
        if (props.StockId > 0) {

            props.GetDetail(props.StockId);
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



    if (!props.Stock) {
        return <div></div>
    }

    return <div className='stock-page'>
        <div>
            <span>{props.Stock.Code}</span>
            <span>{props.Stock.Name}</span>
            <span>{props.Stock.Id}</span>
        </div>
        <div className='stock-block'>
            <div className='stock-block-history'>
                <span>история</span>
                {props.StockHistory.map(x => {
                    return <div key={x.Id}>
                        {x.Id}
                        {x.Price}
                        {x.CurrencyId}
                    </div>

                })}
            </div>
        </div>

    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(StockDetail);