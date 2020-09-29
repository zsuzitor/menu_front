
import React from 'react'


export default class CardsFilters extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        return <div>
            <p>Фильтры</p>
            <div><input type="checkbox" defaultChecked={this.props.FollowOnly} onChange={this.props.changed} /></div>
        </div>
    }

}