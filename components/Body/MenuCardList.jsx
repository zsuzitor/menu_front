import React from 'react'
import OneMenuCard from './OneMenuCard.jsx'

//export default 
export default class MenuCardList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.elements = [
            {
                OldState: {
                    Id: 1,
                    Title: 'header1',
                    Body: 'body1',
                    Image: '../../images/user_empty_image.png'
                },
                NewState : null,
                EditNow : false,
            },
            {
                OldState: {
                    Id: 2,
                    Title: 'header2',
                    Body: 'body2',
                    Image: '../../images/user_empty_image.png'
                },
                NewState : null,
                EditNow : false,
            },

        ];
        // this.onTextChanged = this.onTextChanged.bind(this);
    }

    updateElement(newElement){

    }


    render() {
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        return <div className='row'>
            {this.state.elements.map(item => (
                <OneMenuCard key={item.OldState.Id} data={item} updateElement={this.updateElement}/>
            ))}
        </div>

    }
}



