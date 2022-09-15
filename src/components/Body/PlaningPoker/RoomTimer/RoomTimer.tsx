import React, { useState, useEffect } from 'react';


require('./RoomTimer.css');

interface IRoomTimerProps {
    DieDate: Date;
    AliveRoom: () => void;
}


let __planing_room_timer_props_ref__: IRoomTimerProps = null;

const RoomTimer = (props: IRoomTimerProps) => {

    const [lifeTime, setLifeTime] = useState(0);
    // const [interval, setStateInterval] = useState(null);

    __planing_room_timer_props_ref__ = props;

    // const secRender = new Date().getSeconds();

    useEffect(() => {
        let interv = setInterval(() => {
            if (__planing_room_timer_props_ref__.DieDate) {
                setLifeTime(__planing_room_timer_props_ref__.DieDate.getTime() - new Date().getTime());
            }
        }, 1000);

        // setStateInterval(interv);


        return () => {
            // clearInterval(interval);
            clearInterval(interv);
            // setStateInterval(null);
        }
    }, [])


    let lifeTimeDate = new Date(lifeTime);//это не совсем красиво
    let hours = lifeTimeDate.getUTCHours();
    let minutes = lifeTimeDate.getUTCMinutes();
    let seconds = lifeTimeDate.getUTCSeconds();
    let smallTime = hours === 0 && minutes < 10;
    let blockClass = 'planing-room-timer-block';
    if (smallTime) {
        blockClass+=' planing-room-timer-block-alert';
    }
    return <div className={blockClass}>
        <h3 className='planing-room-time'
            title="По истечении времени жизни, комната помещается в очередь на удаление, актуальные комнаты лучше не доводить до такого состояния"
        >{hours}:{minutes}:{seconds}</h3>
        <div className='planing-room-timer-refresh' onClick={props.AliveRoom} title="Продлить существование комнаты">
            <img className='persent-100-width-height' src="/images/refresh.png" />
        </div>
        {/* <button className="btn btn-primary" onClick={props.AliveRoom}>Увеличить время до 2х часов</button> */}
    </div>

}




export default RoomTimer;


