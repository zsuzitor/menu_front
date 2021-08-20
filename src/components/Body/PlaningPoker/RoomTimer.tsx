import React, { useState, useEffect } from 'react';


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

    return <div>
        <h3
            title="По истечении времени жизни комната помещается в очередь на удаление, актуальные комнаты лучше не доводить до такого состояния"
        >Время жизни комнаты: {lifeTimeDate.getUTCHours()}:{lifeTimeDate.getUTCMinutes()}:{lifeTimeDate.getUTCSeconds()}</h3>
        <button className="btn btn-primary" onClick={props.AliveRoom}>Увеличить время до 2х часов</button>
    </div>

}




export default RoomTimer;


