import React, { useState, useEffect } from 'react';



require('./Paggination.css');




export interface IPagginationProps {
    PageNumber: number;
    ElementsCount: number;
    ElementsOnPage: number;
    SetPageNumber: (num: number) => void;
}



const Paggination = (props: IPagginationProps) => {
    return <div></div>

    //todo сделать подругому
    //делаю кнопки:
    // 1 < текущая страница > последняя страница .. тут кнопки перехода предыдущая следующая

    const renderOneBut = (num: number) => {
        return <div className='one-paggination-button' onClick={() => props.SetPageNumber(num)}>{num}</div>
    }

    let allPageCount = Math.floor(props.ElementsCount / props.ElementsOnPage);
    if (allPageCount < 1) {
        allPageCount = 1;
    }

    if (props.ElementsCount % props.ElementsOnPage != 0) {
        allPageCount++;
    }


    let startBut = 1;
    if (props.PageNumber === 1) {
        startBut = 2;
    }
    else if (props.PageNumber === allPageCount) {
        startBut = props.PageNumber - 4;
    }
    else {
        startBut = props.PageNumber - 1;
    }

    if (startBut < 2) {
        startBut = 2;
    }



    let allBut = [];
    allBut.push(1);






    for (let i = 0; i < 3; ++i) {
        if (startBut < allPageCount) {
            allBut.push(startBut++);
        }
    }

    if (startBut <= allPageCount) {
        allBut.push(allPageCount);
    }
    else {
        allBut.push(startBut++);
    }



    return <div>

    </div>
}




export default Paggination;