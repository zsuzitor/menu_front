import React, { useState, useEffect } from 'react';
import connectToStore, { IPortfolioDetailProps } from './PortfolioDetailSetup';
import cloneDeep from 'lodash/cloneDeep';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';



require('./PortfolioDetail.css');




const PortfolioDetail = (props: IPortfolioDetailProps) => {




    const navigate = useNavigate();

    useEffect(() => {
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



    const { portfolioId } = useParams();
    useEffect(() => {
        if (portfolioId) {
            const idInt = parseInt(portfolioId, 10);
            if (props.PortfolioId !== idInt) {
                props.SetCurrentPortfolioId(idInt);
            }
        } else {
            if (props.PortfolioId > 0) {
                props.SetCurrentPortfolioId(-1);
            }
        }
    }, [portfolioId, props.PortfolioId]);



    if (!props.Portfolio) {
        return <div></div>
    }

    return <div className='portfolio-page'>
        <div>
            <span>{props.Portfolio.Name}</span>
            <span>{props.Portfolio.Id}</span>
        </div>
        <div className='Portfolio-block'>

        </div>

    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(PortfolioDetail);