// import React, { useState, useEffect } from 'react';
// import connectToStore, { IPortfolioElementDetailProps } from './PortfolioElementDetailSetup';
// import cloneDeep from 'lodash/cloneDeep';
// import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
// import RouteBuilder from '../../Models/BL/RouteBuilder';
// import AdditionalWindow from '../../../../components/Body/AdditionalWindow/AdditionalWindow';
// import AddStockEvent from '../AddStockEvent/AddStockEvent';
// import { Stock } from '../../Models/Entity/State/Stock';
// import PortfolioEdit from '../PortfolioEdit/PortfolioEdit';



// require('./PortfolioElementDetail.css');




// const PortfolioElementDetail = (props: IPortfolioElementDetailProps) => {




//     const navigate = useNavigate();

//     useEffect(() => {
        
//         return () => {
//         }
//     }, []);

//     // useEffect(() => {
//     //     if (props.PortfolioId > 0) {
//     //         props.GetDetail(props.PortfolioId);
//     //         props.LoadPortfolioElements(props.PortfolioId);

//     //     }

//     // }, [props.PortfolioId]);







//     if (!props.PortfolioId) {
//         return <div></div>

//     }

//     return <div className='portfolio-page'>
       

//         <div>
//             <div className='portfolio-name'>{props.Portfolio.Name} - {props.Portfolio.Id}</div>
//             <div>

//             </div>
//         </div>
//         <div className='portfolio-main-buttons-block'>
//             <div>
//                 <a href={portfolioEventsUrl} onClick={(e) => {
//                     e.preventDefault();
//                     navigate(portfolioEventsUrl);
//                 }}>История</a>
//             </div>
//             <div><button onClick={() => setShowNewEventWindow(true)}>Добавить событие</button></div>
//             <div><button onClick={() => setShowEditWindow(true)}>Редактировать портфель</button></div>
//         </div>
//         <p>Состав портфеля</p>
//         <div className='portfolio-elements-block'>
//             {props.Elements.map(x => {
//                 return <div className='portfolio-element' key={x.Id}>
//                     <div>
//                         <div>
//                             {x.StockName}
//                         </div>
//                         <div>
//                             {x.Count} шт. по текущей цене {x.Price} {x.CurrencyName}, всего {x.Sum} {x.CurrencyName}
//                         </div>
//                     </div>
//                 </div>

//             })}


//         </div>

//     </div>
// }



// // and that function returns the connected, wrapper component:
// export default connectToStore(PortfolioElementDetail);