import React, { useState, useEffect } from 'react';
import connectToStore, { IFinancialAssistantMainProps } from './FinancialAssistantMainSetup';
import cloneDeep from 'lodash/cloneDeep';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { FinancialAssistantAppRoute } from '../../Models/Consts';
import PortfolioList from '../PortfolioList/PortfolioList';



require('./FinancialAssistantMain.css');




const FinancialAssistantMain = (props: IFinancialAssistantMainProps) => {


    useEffect(() => {

    }, []);





    return <div>
        <Routes>


            <Route path={``} element={<PortfolioList />} />
        </Routes>

    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(FinancialAssistantMain);