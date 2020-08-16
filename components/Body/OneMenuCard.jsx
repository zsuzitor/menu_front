
import React from 'react'

//export default 
export default class OneMenuCard extends React.Component {

    constructor(props) {
        super(props);
        // this.onTextChanged = this.onTextChanged.bind(this);
        this.state=props.data;
    }



    render() {

        return <div className='col-sm-6 col-md-4 col-lg-3' style={{padding:'20px'}}>
         <div className="card one-menu-card-inner">
            <img src={this.state.Image} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{this.state.Title}</h5>
                <p className="card-text">{this.state.Body}</p>
            </div>
        </div>
        </div>
    }
}

// module.exports = MainHeader;