import React from 'react'
import OneMenuCard from './OneMenuCard.jsx'

//export default 
export default class MenuCardList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        // this.state.elements = props.cardsList;
        // this.onTextChanged = this.onTextChanged.bind(this);
    }

    


    render() {
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        return <div className='row'>
            {this.props.CardsList.map(item => (
                <OneMenuCard key={item.Id} CardData={item} UpdateElement={this.props.updateElement} FollowRequstSuccess={this.props.FollowRequstSuccess}/>
            ))}
        </div>

    }
}



