import React, { useState, useEffect } from 'react';


require('./RoomTimer.css');

interface IRoomTimerProps {
    DieDate: Date;
    AliveRoom: () => void;
    ForceLeaveFromRoom: () => void;
}

let __planing_room_iterator__: number = 0;

const RoomTimer = (props: IRoomTimerProps) => {

    const [iterator, setIterator] = useState(0);
    __planing_room_iterator__ = iterator;

    useEffect(() => {
        let interv = setInterval(() => {
            if (__planing_room_iterator__ > 10000) {
                __planing_room_iterator__ = 0;
            }

            setIterator(__planing_room_iterator__ + 1);
        }, 1000);
        return () => {
            clearInterval(interv);
        }
    }, [])

    let timerVal = 0;
    if (props.DieDate) {
        timerVal = props.DieDate.getTime() - new Date().getTime();
        timerVal = timerVal > 0 ? timerVal : 0;
        if (timerVal === 0) {
            props.ForceLeaveFromRoom();
        }
    }




    let lifeTimeDate = new Date(timerVal);//это не совсем красиво
    let hours = lifeTimeDate.getUTCHours();
    let minutes = lifeTimeDate.getUTCMinutes();
    let seconds = lifeTimeDate.getUTCSeconds();
    let smallTime = hours === 0 && minutes < 10;
    let blockClass = 'planing-room-timer-block';
    if (smallTime) {
        blockClass += ' planing-room-timer-block-alert';
    }

    let hoursString: string = hours + '';
    if (hours < 10) {
        hoursString = '0' + hours;
    }
    
    let minutesString: string = minutes + '';
    if (minutes < 10) {
        minutesString = '0' + minutes;
    }
    
    let secondsString: string = seconds + '';
    if (seconds < 10) {
        secondsString = '0' + seconds;
    }

    return <div className={blockClass}>
        <h3 className='planing-room-time'
            title="По истечении времени жизни, комната помещается в очередь на удаление, актуальные комнаты лучше не доводить до такого состояния"
        >{hoursString}:{minutesString}:{secondsString}       {iterator}</h3>
        <div className='planing-room-timer-refresh' onClick={props.AliveRoom} title="Продлить существование комнаты">
            <img className='persent-100-width-height' src="/images/refresh.png" />
        </div>
    </div>

}




export default RoomTimer;


