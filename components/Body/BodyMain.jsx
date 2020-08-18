
import React from 'react'
import BodyCardsListMain from './BodyCardsListMain.jsx'


//export default 
export default class BodyMain extends React.Component {

    constructor(props) {
        super(props);
        // this.onTextChanged = this.onTextChanged.bind(this);
    }



    render() {
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        return <BodyCardsListMain />

    }
}

// module.exports = MainHeader;