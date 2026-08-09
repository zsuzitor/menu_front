import React, { useState, useEffect } from 'react';
import connectToStore, { IPortfolioListProps } from './PortfolioListSetup';
import cloneDeep from 'lodash/cloneDeep';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SaveCancelInputText from '../../../../components/Body/SaveCancelInput/SaveCancelInputText';
import RouteBuilder from '../../Models/BL/RouteBuilder';



require('./PortfolioList.css');




const PortfolioList = (props: IPortfolioListProps) => {

    const [newPortfolioName, setNewPortfolioName] = useState("");
    // const [editPortfolioName, setEditPortfolioName] = useState("");
    const [editPortfolioId, setEditPortfolioId] = useState(0);


    const navigate = useNavigate();

    useEffect(() => {
        props.LoadPortfolioList();
    }, []);





    return <div className='portfolio-list-page'>
        <div>

            <input type='text' className='new-portfolio-input'
                placeholder='Введите название'
                value={newPortfolioName}
                onChange={e => setNewPortfolioName(e.target.value)}></input>
            <button onClick={() => props.Create(newPortfolioName)}>Создать</button>
        </div>
        <div className='portfolio-list-block'>
            {props.PortfolioList.map(x => {

                const portfolioUrl = new RouteBuilder().PortfolioUrl(x.Id);

                return <div className='one-portfolio-element'  key={x.Id}>
                    {editPortfolioId == x.Id ? <>
                        <SaveCancelInputText
                            Text={x.Name}
                            CancelEvent={() => setEditPortfolioId(0)}
                            SaveEvent={(val) => {
                                props.Update(x.Id, val, null);
                                return true;
                            }}
                        ></SaveCancelInputText>
                    </> : <>
                        <div onClick={() => {
                            setEditPortfolioId(x.Id);
                            // setEditPortfolioName(x.Name);
                        }}>{x.Name}</div>

                    </>}

                    <div>
                        <button onClick={() => props.Delete(x.Id)}>Удалить</button>
                        {/* <button onClick={() => props.Update(x.Id, newPortfolioName, null)}>Обновить</button> */}
                        <a href={portfolioUrl} onClick={(e) => {
                            e.preventDefault();
                            navigate(portfolioUrl);
                        }}>Открыть</a>
                    </div>

                </div>
            })}
        </div>

    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(PortfolioList);