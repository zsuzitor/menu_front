import React, { useState, useEffect } from 'react';


require('./OneVoteCard.css');

class OneVoteCardProp {
    Val: string;
    NeedSelect: boolean;
}


const OneVoteCard = (props: OneVoteCardProp) => {

    let selectedClass = "";
    if (props.NeedSelect) {
        selectedClass += " one-planing-selected-vote-card";
    }


    return <div className={"one-planing-vote-card" + selectedClass} data-vote={"" + props.Val}>
        <div className='vote-card-mark-left' data-vote={"" + props.Val}>{props.Val}</div>
        <div className='vote-card-inner' data-vote={"" + props.Val}>{props.Val}</div>
        <div className='vote-card-mark-right' data-vote={"" + props.Val}>{props.Val}</div>

    </div>


}




export default OneVoteCard;
