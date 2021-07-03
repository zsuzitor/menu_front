import React, { useState, useEffect } from 'react';


class OneVoteCardProp {
    Val: string;
    NeedSelect: boolean;
}


const OneVoteCard = (props: OneVoteCardProp) => {

    let selectedClass = "";
    if (props.NeedSelect) {
        selectedClass += " one-planing-selected-vote-card";
    }


    return <div className={"one-planing-vote-card" + selectedClass} data-vote={"" + props.Val}>{props.Val}</div>


}




export default OneVoteCard;
