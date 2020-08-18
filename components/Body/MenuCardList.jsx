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
            {this.props.cardsList.map(item => (
                <OneMenuCard key={item.OldState.Id} data={item} updateElement={this.props.updateElement} />
            ))}
        </div>

    }
}



